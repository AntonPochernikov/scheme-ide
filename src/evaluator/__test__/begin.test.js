import { isBegin } from '../expressions/begin';

describe('isBegin', () => {
  it('should return true', () => {
    expect(isBegin(['begin', 'x', 5])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isBegin([])).toBeFalsy();
  });
});
