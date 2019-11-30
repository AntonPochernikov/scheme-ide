import map from '../utils/map';

describe('map', () => {
  it('should process values', () => {
    expect(map(
      results => results[0] * results[1],
      [1, 2, 3],
      [2, 3, 5],
    )).toEqual([2, 6, 15]);
  });

  it('should pass index correctly', () => {
    expect(map(
      ([val1, val2], i) => `${val1}-${val2}-${i}`,
      ['one', 'two', 'three'],
      [1, 2, 3],
    )).toEqual(['one-1-0', 'two-2-1', 'three-3-2']);
  });

  it('should map collections with different length', () => {
    expect(map(
      ([val1, val2]) => val1 + val2,
      [1, 2, 3, 4, 5],
      [2, 3, 5],
    )).toEqual([3, 5, 8]);

    expect(map(
      ([val1, val2]) => val1 + val2,
      [1, 2, 3, 4, 5],
      [],
    )).toEqual([]);
  });
});
