import { isQuoted, textOfQuotation } from '../expressions/quote';

describe('isQuoted', () => {
  it('should return true', () => {
    expect(isQuoted(['quote', '5'])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isQuoted([])).toBeFalsy();
  });
});

describe('textOfQuotation', () => {
  it('should return text of quote', () => {
    expect(textOfQuotation(['quote', '5'])).toBe('5');
  });
});
