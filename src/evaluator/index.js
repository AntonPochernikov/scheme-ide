import setupEnvironment from './config/setupEnvironment';
import stringToAst from './stringToAst';
import evaluate from './evaluate';

const env = setupEnvironment();

export default function run(code) {
  const ast = stringToAst(code.replace(/\s\s+/g, ' '));
  return evaluate(ast, env);
}
