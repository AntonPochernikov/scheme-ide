import {
  cons,
  car,
  cdr,
  isPair,
  list,
  isEmptyList,
  theEmptyList,
} from '../objects/list';

describe('cons', () => {
  it('should cons pairs and get car/cdr', () => {
    const pair = cons(1, 2);
    expect(car(pair)).toBe(1);
    expect(cdr(pair)).toBe(2);
  });

  it('should cons nested pairs', () => {
    const pair = cons(
      cons(3, cons(1, 4)),
      2,
    );
    expect(car(car(pair))).toBe(3);
    expect(car(cdr(car(pair)))).toBe(1);
    expect(cdr(cdr(car(pair)))).toBe(4);
    expect(cdr(pair)).toBe(2);
  });

  it('should produce pair type', () => {
    expect(isPair({})).toBeFalsy();
    expect(isPair(cons(1, 2))).toBeTruthy();
  })
});

describe('list', () => {
  it('should cons lists and get its values', () => {
    const l = list(1, 2, 3, 4);
    expect(car(l)).toBe(1);
    expect(car(cdr(l))).toBe(2);
    expect(cdr(cdr(cdr(cdr(l))))).toBe(theEmptyList);
  });

  it('should recongnize if list is empty', () => {
    expect(isEmptyList(list())).toBeTruthy();
  });
});
