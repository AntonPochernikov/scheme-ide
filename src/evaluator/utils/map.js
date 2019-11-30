// custom map for unlimited amount of collections
export default (iteratee, ...collections) => {
  const iter = (acc, items, index) => {
    if (items.some(arr => arr.length === 0)) {
      return acc;
    }

    const heads = items.map(([head]) => head);
    const tails = items.map(([, ...tail]) => tail);
    return iter(
      [...acc, iteratee(heads, index)],
      tails,
      index + 1,
    );
  };

  return iter([], collections, 0);
};
