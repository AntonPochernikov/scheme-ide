import { isIf, makeIf } from '../expressions/if';

describe('isIf', () => {
  it('should return true', () => {
    expect(isIf(['if', 'x', 5, 0])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isIf([])).toBeFalsy();
  });
});

describe('makeIf', () => {
  it('should make if', () => {
    expect(makeIf(['=', 'x', ''], 5, 0)).toEqual([
      'if',
      ['=', 'x', ''],
      5,
      0,
    ]);

    expect(makeIf(['=', 'x', ''], 5)).toEqual([
      'if',
      ['=', 'x', ''],
      5,
      'false',
    ]);
  });
});
