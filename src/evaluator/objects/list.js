export const theEmptyList = Symbol('THE_EMPTY_LIST');

export const cons = (x, y) => {
  const pair = selector => selector(x, y);
  pair.isPair = true;
  return pair;
};

export const isPair = pair => typeof pair === 'function' && pair.isPair;

export const car = pair => pair(x => x);
export const cdr = pair => pair((_, y) => y);

export const list = (...args) => {
  if (args.length === 0) {
    return theEmptyList;
  }
  const [head, ...tail] = args;
  return cons(
    head,
    list(...tail),
  );
};

export const isEmptyList = l => l === theEmptyList;
