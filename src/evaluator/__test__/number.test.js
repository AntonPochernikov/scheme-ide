import { isNumber, evalNumber } from '../expressions/number';

describe('isNumber', () => {
  it('should return true', () => {
    expect(isNumber(5)).toBeTruthy();
    expect(isNumber(-1.123)).toBeTruthy();

  });
  it('should return false', () => {
    expect(isNumber('5')).toBeFalsy();
    expect(isNumber([])).toBeFalsy();
  });
});

describe('evalNumber', () => {
  it('should return same value', () => {
    expect(evalNumber(5)).toBe(5);
    expect(evalNumber(-1.123)).toBe(-1.123);
  });
});
