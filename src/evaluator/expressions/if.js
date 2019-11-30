export const isIf = (exp) => {
  if (Array.isArray(exp) && exp[0] === 'if') {
    return true;
  }
};

export const ifPredicate = exp => exp[1];
export const ifConsequent = exp => exp[2];
export const ifAlternative = exp => exp[3] || 'false';

export const makeIf = (predicate, consequent, alternative = 'false') => ([
  'if',
  predicate,
  consequent,
  alternative,
]);
