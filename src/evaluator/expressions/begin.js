export const isBegin = (exp) => {
  if (Array.isArray(exp) && exp[0] === 'begin') {
    return true;
  }
};

export const beginActions = ([, ...actions]) => actions;
export const makeBegin = (...exps) => (['begin', ...exps]);
