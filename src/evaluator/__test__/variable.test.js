import { isVariable } from '../expressions/variable';

describe('isVariable', () => {
  it('should return true', () => {
    expect(isVariable('x')).toBeTruthy();
  });
  it('should return false', () => {
    expect(isVariable('5')).toBeFalsy();
    expect(isVariable(5)).toBeFalsy();
  });
});
