// custom reduce for unlimited amount of collections
export default (iteratee, initial = [], ...collections) => {
  const iter = (acc, items, index) => {
    if (items.some(arr => arr.length === 0)) {
      return acc;
    }

    const heads = items.map(([head]) => head);
    const tails = items.map(([, ...tail]) => tail);
    return iter(
      iteratee(acc, heads, index),
      tails,
      index + 1,
    );
  };

  return iter(initial, collections, 0);
};
