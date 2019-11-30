import compose from '../utils/compose';

describe('compose', () => {
  const double = value => value * 2;
  const square = value => value * value;
  const inc = value => value + 1;

  it('combines several functions', () => {
    expect(
      compose(double, square, inc)(5),
    ).toBe(101);

    expect(
      compose(square, inc, double)(5),
    ).toBe(52);

    expect(
      compose(inc, double, square)(5),
    ).toBe(144);
  });
});
