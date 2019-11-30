import { isString, evalString } from '../expressions/string';

describe('isString', () => {
  it('should return true', () => {
    expect(isString(['string', '5'])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isString([])).toBeFalsy();
  });
});

describe('evalString', () => {
  it('should return string value', () => {
    expect(evalString(['string', '5'])).toBe('5');
  });
});
