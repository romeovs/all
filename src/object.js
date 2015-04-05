// wether or not something is a plain object
var isObject = function(val) {
  return val && '[object Object]' === val.toString();
};

// resolves all promises in object
var realiseObject = function (object, all) {
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
        all(object[key])
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

export default {
  check:   isObject
, realise: realiseObject
};
