# all

[![Build Status](https://travis-ci.org/romeovs/all.svg?branch=master)](https://travis-ci.org/romeovs/all)
[![Coverage Status](https://coveralls.io/repos/romeovs/all/badge.svg?branch=master)](https://coveralls.io/r/romeovs/all?branch=master)


`all` provides a simple utility to create a promise
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
    // }
  });
```
The same will work if the argument is an array.

## Usage
`all` exposes one function.  This function return a single promise
that resolves when all promises in the argument are resolved.  The promise
will be rejected when one of the promises in the arguments is rejected, with
the reason of this rejection.

Note that it does not potential promises that might be returned by the promises
in the structure.

Some facts:

 - simple values can be entered as argument.

    ```js
    all(1).then(res => /* res === 1*/);
    ```
 - single promises can be entered as argument.

    ```js
    all(Promise.resolve(1)).then(res => /* res === 1*/);
    ```

### Rejection
When one of the promises in the nested structure rejects, the promise returned
by `all` also rejects immediatly.  Other promises in the structure will keep on
working, as there might be other clients listening to them.

## Installation

To install `all`:
```sh
npm install --save romeovs/all
```

The module is written in ES6-compliant syntax that needs to
be transpiled, you need to have [`babel`](https://babeljs.io) installed
on your system before installing it.  If you don't have it, the above command
will fail.  To fix this, do:

```sh
npm install --global babel
```

## Immutable.js
`all` has support for most [`Immutable.js`](https://github.com/facebook/immutable-js) 
data structures.  These have been implemented:

  - `List`
  - `Set`
  - `OrderedSet`
  - `Map`
  - `OrderedMap`

Other structures (where iterating trough them makes sense) are coming soon!
Also some work is needed for the `Ordered` structures to keep the order correct.

Note that `all` does not have a dependency on the `immutable` package itself,
it just knows to deal with these values by detecting them trough duck-typing and
knowing how to iterate trough them.  Facebook has done a great job on keeping
the API simple and general!

## Hooks
You can add support for your custom data-type by calling `all.addHook(hook)`.
A hook looks like this:

```js
{
  check: function(thing) {
    // return true if hook applies to thing,
    // false if otherwise
    return isMyCustomType(thing);
  }
, realise: function(thing, realise) {
    // return promise that resolves to
    // realised thing, perhaps using the realise
    // parameter to realise parts of thing
    return Promise.resolve(thing);
  }
}
```

Check the hook I wrote in [test for
hooks](https://github.com/romeovs/all/blob/master/test/hooks.js#L11-L24)
that implements `all` for the
[`Maybe`](https://github.com/romeovs/all/blob/master/test/maybe.js) data-type.


## Todo

  - add support for resolving promises that are returned from promises.
    For example:

    ```js
    all(Promise.resolve([1, Promise.resolve(2), 2]));
    ```

    should resolve to `[1, 1, 1,]` instead of `[1, Promise, 1]`.

  - use better generative testing framework
  - add test coverage

