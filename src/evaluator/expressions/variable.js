export const isVariable = exp => typeof exp === 'string' && Number.isNaN(Number(exp));
