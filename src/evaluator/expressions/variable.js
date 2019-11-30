export const isVariable = exp => (typeof exp === 'string' && isNaN(Number(exp)));
