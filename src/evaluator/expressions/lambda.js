export const isLambda = (exp) => {
  if (Array.isArray(exp) && exp[0] === 'lambda') {
    return true;
  }
};

export const lambdaParameters = exp => exp[1];
export const lambdaBody = ([,, ...body]) => body;
