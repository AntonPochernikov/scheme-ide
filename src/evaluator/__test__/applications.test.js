import { isApplication, operator, operands } from '../expressions/application';

describe('isApplication', () => {
  it('should return true', () => {
    expect(isApplication(['set!', 'x', 5])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isApplication([])).toBeFalsy();
  });
});

describe('operator', () => {
  it('should return operator', () => {
    expect(operator(['square', 'x'])).toBe('square');
  });
});
describe('operands', () => {
  it('should return operands', () => {
    expect(operands(['square', 'x'])).toEqual(['x']);
  });
});
