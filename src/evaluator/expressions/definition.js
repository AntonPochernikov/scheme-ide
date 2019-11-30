export const isDefinition = (exp) => {
  if (Array.isArray(exp) && exp[0] === 'define') {
    return true;
  }
};

export const definitionVariable = exp => exp[1];
export const definitionValue = exp => exp[2];
