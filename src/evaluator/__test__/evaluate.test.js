import evaluate from '../evaluate';
import {
  makeFrame,
  makeEnvironment,
} from '../environment';

describe('eval', () => {
  const env = makeEnvironment(
    makeFrame(['id', 'name', 'age'], ['123', 'Paul', 25]),
    makeFrame(['x'], [5]),
    makeFrame(['variable'], ['value']),
  );

  it('should evaluate number', () => {
    expect(evaluate(5, env)).toBe(5);
  });

  it('should evaluate string', () => {
    expect(evaluate(['string', '5'], env)).toBe('5');
  });

  it('should evaluate quote', () => {
    expect(evaluate(['quote', 'text'], env)).toBe('text');
  });

  it('should evaluate assignment', () => {
    const env = makeEnvironment(
      makeFrame(['id', 'name', 'age'], ['123', 'Paul', 25]),
      makeFrame(['x'], [5]),
      makeFrame(['variable'], ['value']),
    );

    evaluate(['set!', 'name', ['string', 'John']], env);
    evaluate(['set!', 'variable', ['string', 'new value']], env);

    expect(env).toEqual(makeEnvironment(
      makeFrame(['id', 'name', 'age'], ['123', 'John', 25]),
      makeFrame(['x'], [5]),
      makeFrame(['variable'], ['new value']),
    ));
  });

  it('should evaluate definition', () => {
    const env = makeEnvironment(
      makeFrame(['id', 'name', 'age'], ['123', 'Paul', 25]),
      makeFrame(['x'], [5]),
      makeFrame(['variable'], ['value']),
    );

    evaluate(['define', 'name', ['string', 'John']], env);
    evaluate(['define', 'variable', ['string', 'value']], env);

    expect(env).toEqual(makeEnvironment(
      makeFrame(['id', 'name', 'age', 'variable'], ['123', 'John', 25, 'value']),
      makeFrame(['x'], [5]),
      makeFrame(['variable'], ['value']),
    ));
  });

  it('should evaluate if', () => {
    const env = makeEnvironment(
      makeFrame(
        ['id', 'name', 'age', 'falsyVariable'],
        ['123', 'Paul', 25, false],
      ),
      makeFrame(['x'], [5]),
      makeFrame(['variable', 'false'], ['value', false]),
    );

    expect(evaluate(['if', 'x', 'x'], env)).toEqual(5);
    expect(evaluate(
      ['if', 'falsyVariable', 'x', 'variable'],
      env,
    )).toEqual('value');

    expect(evaluate(
      ['if', 'falsyVariable', 'x'],
      env,
    )).toEqual(false);
  });

  it('should evaluate lambda', () => {
    expect(
      JSON.stringify(evaluate(
        ['lambda', ['x'], ['*', 'x', 'x']],
        env,
      )),
    ).toEqual(
      JSON.stringify(['procedure', ['x'], [['*', 'x', 'x']], () => env]),
    );
  });

  it('should evaluate begin', () => {
    const env = makeEnvironment(
      makeFrame(
        ['id', 'name', 'age', 'falsyVariable'],
        ['123', 'Paul', 25, false],
      ),
      makeFrame(['x'], [5]),
      makeFrame(['variable'], ['value']),
    );

    expect(evaluate([
      'begin',
      ['set!', 'name', ['string', 'John']],
      ['define', 'variable', ['string', 'value']],
      ['if', 'falsyVariable', 'x', 'variable'],
    ], env)).toBe('value');

    expect(env).toEqual(makeEnvironment(
      makeFrame(
        ['id', 'name', 'age', 'falsyVariable', 'variable'],
        ['123', 'John', 25, false, 'value'],
      ),
      makeFrame(['x'], [5]),
      makeFrame(['variable'], ['value']),
    ));
  });

  it('should evaluate procedure application', () => {
    const env = makeEnvironment(
      makeFrame(
        ['id', 'name', 'age', 'falsyVariable'],
        ['123', 'Paul', 25, false],
      ),
      makeFrame(['x'], [5]),
      makeFrame(
        ['variable', '=', '*', '-'],
        [
          'value',
          ['primitive', (a, b) => {
            return a === b;
          }],
          ['primitive', (...mults) => mults.reduce((a, b) => a * b, 1)],
          ['primitive', (first, ...rest) => rest.reduce((a, b) => a - b, first)],
        ],
      ),
    );

    evaluate([
      'begin',
      [
        'define',
        'identity',
        ['lambda', ['x'], 'x'],
      ],
    ], env);

    expect(
      evaluate(['identity', 'name'], env),
    ).toBe('Paul');

    expect(
      evaluate([
        ['lambda', ['x'], 'x'],
        'age',
      ],  env),
    ).toBe(25);

    expect(
      evaluate([
        'begin',
        [
          'define',
          'factorial',
          [
            'lambda',
            ['x'],
            [
              'if',
              ['=', 'x', 1],
              'x',
              ['*', 'x', ['factorial', ['-', 'x', 1]]]
            ],
          ],
        ],
        ['factorial', 'x'],
      ], env)
    ).toBe(120);
  });
});
