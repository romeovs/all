# all.js
`all.js` provides a simple utility to create a promise
from a nested structure that contains promises.

For example:
```js
import all from 'all'

var nested = {
  a: 'a'
, b: [1, Promise.resolve('b'), 3]
, c: Promise.resolve('c')
};

all(nested)
  .then(function(res) {
    // res will equal:
    // {
    // a: 'a'
    // , b: [1, 'b', 3]
    // , c: 'c'
    // };
  });
```
The same will work if the argument is an array.

## Usage
`all.js` exposes one function.  This function return a single promise
that resolves when all promises in the argument are resolved.  The promise
will be rejected when one of the promises in the arguments is rejected, with
the reason of this rejection.

Note that it does not potential promises that might be returned by the promises
in the structure.

Some facts:

 - simple values can be entered as argument:
    ```js
    all(1).then(res => /* res === 1*/);
    ```
 - promises too:
    ```js
    all(Promise.resolve(1)).then(res => /* res === 1*/);
    ```

## Installation

To install all, just do:
```sh
npm install romeovs/all
```

