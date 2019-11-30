export const isString = (exp) => {
  if (Array.isArray(exp) && exp[0] === 'string') {
    return true;
  }
};

export const evalString = exp => exp[1];
