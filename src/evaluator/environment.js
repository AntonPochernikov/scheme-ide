import reduce from './utils/reduce';

export const theEmptyEnvironment = Symbol('EMPTY_ENVIRONMENT');

export const makeEnvironment = (...frames) => {
  if (frames.length === 0) {
    return theEmptyEnvironment;
  }
  const [first, ...rest] = frames;
  return {
    frame: first,
    closure: makeEnvironment(...rest),
  };
};

const firstFrame = env => env.frame;
const enclosingEnvironment = env => env.closure;
export const makeFrame = (variables, values) => reduce(
  (acc, [variable, value]) => ({ ...acc, [variable]: value }),
  {},
  variables,
  values,
);

export const addBindingToFrame = (variable, value, frame) => {
  // Don't have other way to do that correctly
  // cause we actually need this frame to be the same one.
  // eslint-disable-next-line no-param-reassign
  frame[variable] = value;
  return frame;
};

export const extendEnvironment = (variables, values, baseEnv) => {
  if (variables.length > values.length) {
    throw new Error('Too few arguments supplied');
  }
  if (variables.length < values.length) {
    throw new Error('Too many arguments supplied');
  }

  return {
    frame: makeFrame(variables, values),
    closure: baseEnv,
  };
};

// lookupVariableValue
export const lookupVariableValue = (variable, env) => {
  if (env === theEmptyEnvironment) {
    throw new Error(`Unbound variable: ${variable}`);
  }

  const frame = firstFrame(env);
  if (Object.prototype.hasOwnProperty.call(frame, variable)) {
    return frame[variable];
  }
  return lookupVariableValue(variable, enclosingEnvironment(env));
};

// setVariableValue
export const setVariableValue = (variable, value, env) => {
  if (env === theEmptyEnvironment) {
    throw new Error(`Unbound variable SET-VARIABLE-VALUE!: ${variable}`);
  }
  const frame = firstFrame(env);
  if (Object.prototype.hasOwnProperty.call(frame, variable)) {
    frame[variable] = value;
    return value;
  }
  return setVariableValue(variable, value, enclosingEnvironment(env));
};

// defineVariable
export const defineVariable = (variable, value, env) => {
  const frame = firstFrame(env);
  frame[variable] = value;
  return value;
};
