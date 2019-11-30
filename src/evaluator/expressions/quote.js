export const isQuoted = (exp) => {
  if (Array.isArray(exp) && exp[0] === 'quote') {
    return true;
  }
  return false;
};

export const textOfQuotation = exp => exp[1];
