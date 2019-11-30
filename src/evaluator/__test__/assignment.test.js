import { isAssignment } from '../expressions/assignment';

describe('isAssignment', () => {
  it('should return true', () => {
    expect(isAssignment(['set!', 'x', 5])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isAssignment([])).toBeFalsy();
  });
});
