// check wether something is an immutable;
var isImmutable = function(val) {
  return val && val.asMutable !== undefined;
};

// realise everything in object
var realiseImmutable = function(imm, all) {
  return new Promise(function(resolve, reject) {
    var pending = imm.size;
    var results = imm.clear();

    if ( pending === 0 ) {
      resolve(imm);
    }

    var setter = function(key, val) {
      if ( results.set ) {
        return results.set(key, val);
      } else if ( results.add ) {
        return results.add(val);
      } else {
        reject(new Error(`unknown adder for Immutable of type ${typeof imm}`));
        return;
      }
    };

    imm
      .forEach(function(val, key) {
        all(val)
          .then(function(res) {
            results = setter(key, res);
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
  check:   isImmutable
, realise: realiseImmutable
};
