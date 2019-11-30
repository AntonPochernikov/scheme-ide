import reduce from '../utils/reduce';

describe('reduce', () => {
  it('should process values', () => {
    expect(reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
      ['key1', 'key2', 'key3'],
      ['value1', 'value2', 'value3'],
    )).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    });
  });

  it('should pass index correctly', () => {
    expect(reduce(
      (acc, _, i) => acc + i,
      0,
      ['key1', 'key2', 'key3', 'key4'],
      ['value1', 'value2', 'value3', 'value4'],
    )).toBe(6);
  });

  it('should reduce collections with different length', () => {
    expect(reduce(
      (acc, [val1, val2]) => ([...acc, val1 + val2]),
      [],
      [1, 2, 3, 4, 5],
      [2, 3, 5],
    )).toEqual([3, 5, 8]);

    expect(reduce(
      acc => acc,
      [],
      [],
      [1, 2, 3, 4, 5],
    )).toEqual([]);
  });
});
