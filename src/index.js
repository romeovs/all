import array     from './array'
import object    from './object'
import immutable from './immutable'
import nil       from './nil'
import promise   from './promise'

var hooks = [
  nil
, array
, immutable
, promise
, object
];

var realise = function(thing) {

  try {
    for ( var hook of hooks ) {
      if ( hook.check(thing) ) {
        return hook.realise(thing, realise);
      }
    }
  } catch( err ) {
    return Promise.reject(err);
  }

  // no further work can to be done
  // because it is an atomic value,
  // just resolve it
  return Promise.resolve(thing);
};

realise.addHook = function(hook) {
  if ( hook && hook.check   && hook.check instanceof Function
            && hook.realise && hook.realise instanceof Function ) {
    hooks.unshift(hook);
  } else {
    throw new Error(`invalid hook: ${hook}`);
  }
};

export default realise;
