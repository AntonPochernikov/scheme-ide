export const isAssignment = (exp) => {
  if (Array.isArray(exp) && exp[0] === 'set!') {
    return true;
  }
};

export const assignmentVariable = exp => exp[1];
export const assignmentValue = exp => exp[2];
