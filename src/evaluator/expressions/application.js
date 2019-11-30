export const isApplication = (exp) => {
  if (Array.isArray(exp) && exp.length > 0) {
    return true;
  }
};

export const operator = exp => exp[0];
export const operands = ([, ...ops]) => ops;
export const isEmptyOperands = ops => ops.length === 0;
export const firstOperand = ops => ops[0];
export const restOperands = ([, ...ops]) => ops;
