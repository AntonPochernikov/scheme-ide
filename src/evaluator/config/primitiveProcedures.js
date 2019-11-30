import {
  add,
  sub,
  mul,
  div,
} from '../utils/math';
import {
  list,
  cons,
  car,
  cdr,
  isEmptyList,
} from '../objects/list';
import display from '../utils/display';
import { isEqual } from '../utils/equals';

const procs = [
  ['=', isEqual],
  ['+', add],
  ['-', sub],
  ['*', mul],
  ['/', div],
  ['list', list],
  ['cons', cons],
  ['car', car],
  ['cdr', cdr],
  ['null?', isEmptyList],
  ['display', display],
];

export const primitiveProcedureNames = () => procs.map(([name]) => name);
export const primitiveProcedureObjects = () => procs.map(([, obj]) => (['primitive', obj]));
