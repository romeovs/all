'use strict';

var isObject = function(val) {
  return val && '[object Object]' === val.toString();
}


// resolves all promises in object
var inObject = function (object, rerealise) {
  return new Promise(function(resolve, reject) {
    var keys    = Object.keys(object);
    var pending = keys.length;
    var results = {};

    if ( pending === 0 ) {
      resolve(results);
      return;
    }

    keys
      .forEach(function(key) {
        // recursivly realize the promise at each key
        realise(object[key])
          // save the result
          .then(function(res) {
            results[key] = res;
            if ( --pending === 0 ) {
              resolve(results);
            }
          })
          .catch(function(err) {
            reject(err);
          });
      });
  });
};

var inArray = function (array, rerealise) {
  return Promise.all(array.map(realise));
};

var realise = function(thing, rerealise = false) {
  if ( thing instanceof Array ) {
    // resolve all array elements
    return inArray(thing, rerealise);
  } else if ( isObject(thing) ) {
    if ( thing instanceof Promise ) {
      // thing already is a promise
      return thing;
    } else {
      // resolve all object fields
      return inObject(thing, rerealise);
    }
  } else {
    // no further work needs to be done
    // because it is an atomic value,
    // just resolve it
    return Promise.resolve(thing);
  }
};

export default realise;

// todo: implement rerealise
