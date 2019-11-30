import {
  lookupVariableValue,
  setVariableValue,
  defineVariable,
  extendEnvironment,
} from './environment';
import { isNumber, evalNumber } from './expressions/number';
import { evalString } from './expressions/string';
import { isVariable } from './expressions/variable';
import { textOfQuotation } from './expressions/quote';
import { assignmentVariable, assignmentValue } from './expressions/assignment';
import { definitionVariable, definitionValue } from './expressions/definition';
import { beginActions } from './expressions/begin';
import { ifPredicate, ifConsequent, ifAlternative } from './expressions/if';
import { lambdaParameters, lambdaBody } from './expressions/lambda';
import {
  isApplication,
  operator,
  operands,
  isEmptyOperands,
  firstOperand,
  restOperands,
} from './expressions/application';
import {
  makeProcedure,
  isPrimitive,
  isCompound,
  applyPrimiriveProcedure,
  procedureBody,
  procedureParams,
  procedureEnvironment,
} from './objects/procedure';
import { isTrue } from './objects/boolean';

const evalAssignment = (exp, env) => setVariableValue(
  assignmentVariable(exp),
  evaluate(assignmentValue(exp), env),
  env,
);

const evalDefinition = (exp, env) => defineVariable(
  definitionVariable(exp),
  evaluate(definitionValue(exp), env),
  env,
);

const evalSequence = (seq, env) => {
  if (seq.length === 0) {
    return null;
  }

  const loop = (items) => {
    const [first, ...rest] = items;
    if (rest.length === 0) {
      return evaluate(first, env);
    }
    evaluate(first, env);
    return loop(rest);
  };
  return loop(seq);
};

const evalIf = (exp, env) => {
  const predicate = ifPredicate(exp);
  if (isTrue(evaluate(predicate, env))) {
    return evaluate(ifConsequent(exp), env);
  }
  return evaluate(ifAlternative(exp), env);
};

const listOfValues = (exps, env) => {
  if (isEmptyOperands(exps)) {
    return [];
  }
  return [
    evaluate(firstOperand(exps), env),
    ...listOfValues(restOperands(exps), env),
  ];
};

const expressionEvaluators = {
  quote: textOfQuotation,
  string: evalString,
  'set!': evalAssignment,
  define: evalDefinition,
  if: evalIf,
  lambda: (exp, env) => makeProcedure(
    lambdaParameters(exp),
    lambdaBody(exp),
    env,
  ),
  begin: (exp, env) => evalSequence(beginActions(exp), env),
};

const getEvaluator = (exp) => {
  const type = exp[0];
  return expressionEvaluators[type] || null;
};

export default function evaluate(exp, env) {
  switch (true) {
    case (isNumber(exp)): {
      return evalNumber(exp);
    }
    case (isVariable(exp)): {
      return lookupVariableValue(exp, env);
    }
    // dispatch expression on its type
    case true: {
      const evaluator = getEvaluator(exp);
      if (evaluator) {
        return evaluator(exp, env);
      }
    }
    // case (isCond(exp)): {
    //   return evalIf(condToIf(exp), env);
    // }
    // eslint-disable-next-line no-fallthrough
    case (isApplication(exp)): {
      return apply(
        evaluate(operator(exp), env),
        listOfValues(operands(exp), env),
      );
    }
    default: {
      throw new Error(`Unknown expression type: EVAL. ${exp}`);
    }
  }
}

function apply(f, args) {
  if (isPrimitive(f)) {
    return applyPrimiriveProcedure(f, args);
  }
  if (isCompound(f)) {
    return evalSequence(
      procedureBody(f),
      extendEnvironment(
        procedureParams(f),
        args,
        procedureEnvironment(f),
      ),
    );
  }
  throw new Error(`Unknown procedure type: APPLY. ${f}`);
}
