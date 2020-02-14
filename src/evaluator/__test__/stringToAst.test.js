import stringToAst from '../stringToAst';

describe('stringToAst', () => {
  it('should return emply array', () => {
    expect(stringToAst('')).toEqual(['begin']);
  });

  it('should return number', () => {
    expect(stringToAst('5')).toEqual(['begin', 5]);
  });

  it('should return string', () => {
    expect(stringToAst('"5"')).toEqual(['begin', ['string', '5']]);
  });

  it('should parse application', () => {
    expect(stringToAst(`
      (+ 1 1)
    `)).toEqual([
      'begin',
      ['+', 1, 1],
    ]);
  });

  it('should parse primitive definitions', () => {
    expect(stringToAst(`
      (define x 12)  x
    `)).toEqual([
      'begin',
      ['define', 'x', 12],
      'x',
    ]);
  });

  it('should parse procedure definition', () => {
    expect(stringToAst(`
      (define square
        (lambda (x)
          (* x x)))
    `)).toEqual([
      'begin',
      [
        'define',
        'square',
        ['lambda', ['x'], ['*', 'x', 'x']],
      ],
    ]);
  });

  it('should parse dense expression', () => {
    expect(stringToAst(`
      (define square(lambda(x)(* x x)));(comment )()
    `)).toEqual([
      'begin',
      [
        'define',
        'square',
        ['lambda', ['x'], ['*', 'x', 'x']],
      ],
    ]);
  });

  it('should parse quoted expression', () => {
    expect(stringToAst(`
      (define (eval-assignment exp env)
        'begin
        (set-variable-value! (assignment-variable exp)
                            (eval (assignment-value exp) env)
                            env)
        'ok)
    `)).toEqual([
      'begin',
      [
        'define',
        ['eval-assignment', 'exp', 'env'],
        ['quote', 'begin'],
        [
          'set-variable-value!',
          ['assignment-variable', 'exp'],
          ['eval', ['assignment-value', 'exp'], 'env'],
          'env',
        ],
        ['quote', 'ok'],
      ],
    ]);
  });

  it('should parse comments', () => {
    expect(stringToAst(`
      (define (expand-clauses clauses)
        (if (null? clauses)
            'false ; no else clause
            (let ((first (car clauses))
                  (rest (cdr clauses)));comment
              (if (cond-else-clause? first)
                  (if (null? rest)
                      (sequence->exp (cond-actions first))
                      (error "ELSE clause isn\'t last: COND->IF" clauses))
                  (make-if (cond-predicate first)
                          (sequence->exp (cond-actions first))
                          (expand-clauses rest)))))) ;comment
                          ;comment
    `)).toEqual([
      'begin',
      [
        'define',
        ['expand-clauses', 'clauses'],
        [
          'if',
          ['null?', 'clauses'],
          ['quote', 'false'],
          [
            'let',
            [
              ['first', ['car', 'clauses']],
              ['rest', ['cdr', 'clauses']]
            ],
            [
              'if',
              ['cond-else-clause?', 'first'],
              [
                'if',
                ['null?', 'rest'],
                ['sequence->exp', ['cond-actions', 'first']],
                [
                  'error',
                  ['string', 'ELSE clause isn\'t last: COND->IF'],
                  'clauses',
                ],
              ],
              [
                'make-if',
                ['cond-predicate', 'first'],
                ['sequence->exp', ['cond-actions', 'first']],
                ['expand-clauses', 'rest'],
              ],
            ],
          ],
        ],
      ],
    ]);
  });

  it('should parse several expressions in body', () => {
    expect(stringToAst(`
      (define (if-predicate exp) (cadr exp))
      (define (if-consequent exp) (caddr exp))
      (define (if-alternative exp)
        (if (not (null? (cdddr exp)))
            (cadddr exp)
            'false))
    `)).toEqual([
      'begin',
      ['define', ['if-predicate', 'exp'], ['cadr', 'exp']],
      ['define', ['if-consequent', 'exp'], ['caddr', 'exp']],
      [
        'define',
        ['if-alternative', 'exp'],
        [
          'if',
          ['not', ['null?', ['cdddr', 'exp']]],
          ['cadddr', 'exp'],
          ['quote', 'false'],
        ],
      ],
    ]);
  });
});
