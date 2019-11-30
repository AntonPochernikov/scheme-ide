export const add = (...args) => {
  if (args.length < 2) {
    throw new Error(
      `Addition arrity mismatch.
      Expected at least 2 arguments, but received ${args.length}`,
    );
  }
  return args.reduce((a, b) => a + b, 0);
};

export const sub = (...args) => {
  if (args.length < 2) {
    throw new Error(
      `Substraction arrity mismatch.
      Expected at least 2 arguments, but received ${args.length}`,
    );
  }
  const [min, ...subs] = args;
  return subs.reduce((a, b) => a - b, min)
};

export const mul = (...args) => {
  if (args.length < 2) {
    throw new Error(
      `Multiplication arrity mismatch.
      Expected at least 2 arguments, but received ${args.length}`,
    );
  }
  return args.reduce((a, b) => a * b, 1);
};

export const div = (...args) => {
  if (args.length !== 2) {
    throw new Error(
      `Division arrity mismatch.
      Expected 2 arguments, but received ${args.length}`,
    );
  }
  return args[0] / args[1];
};
