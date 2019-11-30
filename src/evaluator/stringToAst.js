function lookup(arr, path) {
  if (path.length === 0) {
    return arr;
  }
  if (!Array.isArray(arr)) {
    throw new Error(`Argument is not an array: LOOKUP. ${arr}`);
  }
  const [first, ...rest] = path;
  return lookup(arr[first], rest);
}

function pushAtPath(arr, path, value) {
  const target = lookup(arr, path);
  if (!Array.isArray(target)) {
    throw new Error(`Argument is not an array: PUSH_AT_PATH. ${arr}`);
  }
  target.push(value);
}

function parseWord(word) {
  if (!Number.isNaN(Number(word))) {
    return Number(word);
  }
  return word;
}

export default function stringToAst(string) {
  let symbols = string.slice();
  let word = '';
  // states: idle string comment word quote
  let state = 'idle';
  let wordCounter = 1;
  const path = [];
  const parsed = ['begin'];

  while (symbols.length !== 0) {
    const [symbol] = symbols;
    // console.log(symbols, path, parsed, word, wordCounter, state);

    switch (state) {
      case 'idle': {
        switch (symbol) {
          case ';': {
            state = 'comment';
            if (word) {
              pushAtPath(parsed, path, parseWord(word));
              word = '';
            }
            break;
          }
          case '"': {
            state = 'string';
            break;
          }
          // still idle
          case ' ': {
            break;
          }
          // still idle
          case '\n': {
            break;
          }
          case '(': {
            pushAtPath(parsed, path, []);
            path.push(wordCounter);
            wordCounter = 0;
            break;
          }
          case ')': {
            // return to parent path
            path.pop();
            // set word counter to parent length
            wordCounter = lookup(parsed, path).length;
            break;
          }
          case '\'': {
            state = 'quote';

            pushAtPath(parsed, path, []);
            path.push(wordCounter);
            pushAtPath(parsed, path, 'quote');
            wordCounter = 1;

            break;
          }
          // got some symbol
          default: {
            state = 'word';
            word += symbol;
            break;
          }
        }
        break;
      }

      case 'string': {
        switch (symbol) {
          case '"': {
            state = 'idle';

            pushAtPath(parsed, path, ['string', word]);
            word = '';
            wordCounter += 1;

            break;
          }
          case '\n': {
            word += symbol;
            break;
          }
          default: {
            word += symbol;
            break;
          }
        }
        break;
      }

      case 'comment': {
        switch (symbol) {
          case '\n': {
            state = 'idle';
            break;
          }
          default: {
            break;
          }
        }
        break;
      }

      case 'word': {
        switch (symbol) {
          case ';': {
            state = 'comment';

            pushAtPath(parsed, path, parseWord(word));
            word = '';
            wordCounter += 1;

            break;
          }
          case '"': {
            state = 'string';

            pushAtPath(parsed, path, parseWord(word));
            word = '';
            wordCounter += 1;
            break;
          }
          case ' ': {
            state = 'idle';

            pushAtPath(parsed, path, parseWord(word));
            word = '';
            wordCounter += 1;

            break;
          }
          case '\n': {
            state = 'idle';

            pushAtPath(parsed, path, parseWord(word));
            word = '';
            wordCounter += 1;

            break;
          }
          case '(': {
            state = 'idle';
            // push current word
            pushAtPath(parsed, path, parseWord(word));

            // process inner list
            wordCounter += 1;
            pushAtPath(parsed, path, []);
            path.push(wordCounter);

            wordCounter = 0;
            word = '';

            break;
          }
          case ')': {
            state = 'idle';

            pushAtPath(parsed, path, parseWord(word));
            word = '';
            // return to parent path
            path.pop();
            // set word counter to parent length
            wordCounter = lookup(parsed, path).length;

            break;
          }
          case '\'': {
            state = 'quote';

            pushAtPath(parsed, path, []);
            path.push(wordCounter);
            pushAtPath(parsed, path, 'quote');
            wordCounter = 1;

            break;
          }
          default: {
            word += symbol;
            break;
          }
        }
        break;
      }

      case 'quote': {
        switch (symbol) {
          case ';': {
            state = 'comment';

            pushAtPath(parsed, path, parseWord(word));

            path.pop();
            wordCounter = lookup(parsed, path).length;
            word = '';
            break;
          }
          case '"': {
            state = 'string';

            pushAtPath(parsed, path, parseWord(word));
            path.pop();
            wordCounter = lookup(parsed, path).length;

            break;
          }
          case ' ': {
            state = 'idle';

            pushAtPath(parsed, path, parseWord(word));
            path.pop();
            wordCounter = lookup(parsed, path).length;

            word = '';
            break;
          }
          case '\n': {
            state = 'idle';

            pushAtPath(parsed, path, parseWord(word));
            path.pop();
            wordCounter = lookup(parsed, path).length;

            word = '';
            break;
          }
          case '(': {
            state = 'idle';
            pushAtPath(parsed, path, parseWord(word));
            path.pop();
            wordCounter = lookup(parsed, path).length;

            pushAtPath(parsed, path, []);
            path.push(wordCounter);

            wordCounter = 0;

            break;
          }
          case ')': {
            state = 'idle';
            pushAtPath(parsed, path, parseWord(word));
            path.pop();
            wordCounter = lookup(parsed, path).length;

            word = '';
            wordCounter = 0;

            break;
          }
          case '\'': {
            pushAtPath(parsed, path, parseWord(word));
            path.pop();
            wordCounter = lookup(parsed, path).length;
            word = '';

            pushAtPath(parsed, path, []);
            path.push(wordCounter);
            pushAtPath(parsed, path, 'quote');
            wordCounter = 1;

            break;
          }
          default: {
            word += symbol;
            break;
          }
        }
        break;
      }
    }

    symbols = symbols.slice(1);
    if (symbols.length === 0 && word) {
      pushAtPath(parsed, path, parseWord(word));
      word = '';
    }
  }

  return parsed;
};
