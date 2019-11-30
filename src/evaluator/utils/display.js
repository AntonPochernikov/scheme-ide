import {
  isCompound,
  procedureParams,
  procedureBody,
  toString,
} from '../objects/procedure';
import Void from '../objects/void';

export default (obj) => {
  if (isCompound(obj)) {
    console.log(`
      'compound-procedure',
      arguments: ${toString(procedureParams(obj))},
      body: ${toString(procedureBody(obj))},
      '<procedure-env>',
    `);
    return Void;
  }
  console.log(obj);
  return Void;
};
