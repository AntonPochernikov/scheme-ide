import {
  primitiveProcedureNames,
  primitiveProcedureObjects,
} from './primitiveProcedures';
import { extendEnvironment, theEmptyEnvironment, defineVariable } from '../environment';
import { True, False } from '../objects/boolean';
import { theEmptyList } from '../objects/list';

export default function setupEnvironment() {
  const initialEnvironment = extendEnvironment(
    primitiveProcedureNames(),
    primitiveProcedureObjects(),
    theEmptyEnvironment,
  );
  defineVariable('true', True, initialEnvironment);
  defineVariable('false', False, initialEnvironment);
  defineVariable('nil', theEmptyList, initialEnvironment);
  return initialEnvironment;
}
