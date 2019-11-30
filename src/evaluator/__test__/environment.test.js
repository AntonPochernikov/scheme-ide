import {
  makeFrame,
  addBindingToFrame,

  theEmptyEnvironment,
  makeEnvironment,
  extendEnvironment,

  lookupVariableValue,
  setVariableValue,
  defineVariable,
} from '../environment';

describe('makeFrame', () => {
  it('should create frame', () => {
    expect(makeFrame(['var1', 'var2'], ['val1', 'val2'])).toEqual({
      var1: 'val1',
      var2: 'val2',
    });
  });
});

describe('addBindingToFrame', () => {
  it('should add bindings to existing frame', () => {
    expect(
      addBindingToFrame(
        'var3', 'val3',
        makeFrame(['var1', 'var2'], ['val1', 'val2'])
      ),
    ).toEqual({
      var1: 'val1',
      var2: 'val2',
      var3: 'val3',
    });
  });
});

describe('makeEnvironment', () => {
  it('should make empty environment if no frames passed', () => {
    expect(makeEnvironment()).toEqual(theEmptyEnvironment);
  });

  it('should create nested frames', () => {
    expect(makeEnvironment(
      makeFrame(['first'], ['frame']),
      makeFrame(['second'], ['frame']),
      makeFrame(['third'], ['frame']),
    )).toEqual({
      frame: {
        first: 'frame'
      },
      closure: {
        frame: {
          second: 'frame'
        },
        closure: {
          frame: {
            third: 'frame'
          },
          closure: theEmptyEnvironment,
        },
      },
    });
  });
});

describe('extendEnvironment', () => {
  it('should extend environment with variables and values', () => {
    expect(
      extendEnvironment(
        ['var1', 'var2', 'var3'],
        ['val1', 'val2', 'val3'],
        theEmptyEnvironment,
      ),
    ).toEqual({
      frame: {
        var1: 'val1',
        var2: 'val2',
        var3: 'val3',
      },
      closure: theEmptyEnvironment,
    });
  });
});

describe('lookupVariableValue', () => {
  const env = makeEnvironment(
    makeFrame(['x', 'y'], [5, 'string']),
    makeFrame(['z'], ['string']),
    makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
  );

  it('should find variable', () => {
    expect(lookupVariableValue('z', env)).toBe('string');
    expect(lookupVariableValue('x', env)).toBe(5);
    expect(lookupVariableValue('b', env)).toBe('value');
  });

  it('should throw error', () => {
    expect(
      () => lookupVariableValue('a', env),
    ).toThrow(new Error('Unbound variable: a'));
  });
});

describe('setVariableValue', () => {
  const env = makeEnvironment(
    makeFrame(['x', 'y'], [5, 'string']),
    makeFrame(['z'], ['string']),
    makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
  );

  it('should update existing variable value', () => {
    setVariableValue('z', 'new value', env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['x', 'y'], [5, 'string']),
        makeFrame(['z'], ['new value']),
        makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
      ),
    );

    setVariableValue('x', 3, env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['x', 'y'], [3, 'string']),
        makeFrame(['z'], ['new value']),
        makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
      ),
    );

    setVariableValue('b', ['lambda', [] ['value']], env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['x', 'y'], [3, 'string']),
        makeFrame(['z'], ['new value']),
        makeFrame(['z', 'x', 'b'], [3, '1', ['lambda', [] ['value']]]),
      ),
    );
  });

  it('should throw error', () => {
    expect(
      () => setVariableValue('a', 'new value', env),
    ).toThrow(new Error('Unbound variable SET-VARIABLE-VALUE!: a'));
  });
});

describe('defineVariable', () => {
  const env = makeEnvironment(
    makeFrame([], []),
    makeFrame(['z'], ['string']),
    makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
  );

  it('should create new variable in current frame', () => {
    defineVariable('id', '123', env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['id'], ['123']),
        makeFrame(['z'], ['string']),
        makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
      ),
    );

    defineVariable('name', 'Paul', env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['id', 'name'], ['123', 'Paul']),
        makeFrame(['z'], ['string']),
        makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
      ),
    );

    defineVariable('age', 23, env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['id', 'name', 'age'], ['123', 'Paul', 23]),
        makeFrame(['z'], ['string']),
        makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
      ),
    );

    defineVariable('x', 'value', env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['id', 'name', 'age', 'x'], ['123', 'Paul', 23, 'value']),
        makeFrame(['z'], ['string']),
        makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
      ),
    );
  });

  it('should update value of existing variable in current frame', () => {
    defineVariable('id', 15, env);
    expect(env).toEqual(
      makeEnvironment(
        makeFrame(['id', 'name', 'age', 'x'], [15, 'Paul', 23, 'value']),
        makeFrame(['z'], ['string']),
        makeFrame(['z', 'x', 'b'], [3, '1', 'value']),
      ),
    );
  });
});
