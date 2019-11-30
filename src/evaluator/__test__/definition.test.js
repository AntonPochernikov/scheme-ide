import { isDefinition } from '../expressions/definition';

describe('isDefinition', () => {
  it('should return true', () => {
    expect(isDefinition(['define', 'x', 5])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isDefinition([])).toBeFalsy();
  });
});
