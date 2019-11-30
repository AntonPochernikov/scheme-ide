export const makeProcedure = (params, body, env) => ([
  'procedure',
  params,
  body,
  // Thus we can have circular link for environment
  // that contains this procedure.
  () => env,
]);

export const procedureParams = proc => proc[1];
export const procedureBody = proc => proc[2];
export const procedureEnvironment = proc => proc[3]();

export const isCompound = proc => proc[0] === 'procedure';
export const isPrimitive = proc => proc[0] === 'primitive';

const primitiveImplementation = proc => proc[1];
export const applyPrimiriveProcedure = (proc, args) => primitiveImplementation(proc)(...args);

export const toString = (values) => {
  if (Array.isArray(values)) {
    return `(${values.map(val => toString(val)).join(' ')})`;
  }
  return values;
};
