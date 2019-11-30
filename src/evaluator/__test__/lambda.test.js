import { isLambda, lambdaBody } from '../expressions/lambda';

describe('isLambda', () => {
  it('should return true', () => {
    expect(isLambda(['lambda', ['x'], ['x']])).toBeTruthy();
  });
  it('should return false', () => {
    expect(isLambda([])).toBeFalsy();
  });
});

describe('lambdaBody', () => {
  it('should return body', () => {
    expect(lambdaBody(
      ['lambda', ['x'], 'x', ['quoted', 'false']],
    )).toEqual(['x', ['quoted', 'false']]);
  });
});
