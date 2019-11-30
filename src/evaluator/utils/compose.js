export default (...fns) => fns.reduce((f, g) => x => g(f(x)));
