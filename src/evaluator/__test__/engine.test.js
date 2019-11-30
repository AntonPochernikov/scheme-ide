import run from '..';

describe('run', () => {
  it('should return empty value', () => {
    const result = run(`

    `);
    expect(result).toBe(null);
  });

  it('should return number', () => {
    const result = run(`
      5
    `);
    expect(result).toBe(5);
  });

  it('should return string', () => {
    const result = run(`
      "5"
    `);
    expect(result).toBe('5');
  });

  it('should return last expression value', () => {
    const result = run(`
      5
      10
    `);
    expect(result).toBe(10);
  });

  it('should define variables', () => {
    const result = run(`
      (define x 12)
      x
    `);
    expect(result).toBe(12);
  });

  it('should set variable value', () => {
    const result = run(`
      (define x 12)
      (set! x 10)
      x
    `);
    expect(result).toBe(10);
  });

  it('should evaluate primitive procedures', () => {
    const result = run(`
      (+ 10 15 20)
    `);
    expect(result).toBe(45);

    const result2 = run(`
      (* (+ 2 (* 4 6))
         (+ 3 5 7))
    `);
    expect(result2).toBe(390);

    const result3 = run(`
      (define L (list 2 3 4))
      (car (cdr L))
    `);
    expect(result3).toBe(3);
  });

  it('should define and apply procedures', () => {
    const result = run(`
      (define square (lambda (x) (* x x)))
      (square 5)
    `);
    expect(result).toBe(25);

    const result2 = run(`
      (define map
        (lambda (proc L)
          (if (null? L)
              nil
              (cons (proc (car L))
                    (map proc (cdr L))))))

      (car (cdr (map square (list 1 2 3 4 5))))
    `);
    expect(result2).toEqual(4);

    expect(run(`
      (define even? (lambda (n) (if (= n 0) true (odd? (- n 1)))))
      (define odd? (lambda (n) (if (= n 0) false (even? (- n 1)))))
      (odd? 5)
    `)).toBeTruthy();
  });

  it('should compare objects by reference', () => {
    const result = run(`
      (define L (list 1 2 3 4 5))

      (= (cdr L) (cdr L))
    `);
    expect(result).toBeTruthy();
  });
});
