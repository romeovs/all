'use strict';
import chai      from 'chai'
import cas       from 'chai-as-promised'
import Immutable from 'immutable'

chai.use(cas);
var expect = chai.expect;

import all from '../'

var mkPromise = function(val) {
  return Promise.resolve(val);
};


var mapLike = function(name) {
  return [
    'List'
  , 'Set'
  , 'OrderedSet'
  ].indexOf(name) < 0;
};

[
  'List'
, 'Set'
, 'OrderedSet'
, 'Map'
, 'OrderedMap'
// , 'Stack' // todo fix this
// , 'Seq'   // todo fix this
].forEach(function(name) {

  describe(`Immutable.${name}`, function() {
    it(`should return a ${name} of resolved values`, function(done) {

      var mutval  = mapLike(name) ? {a: "a", b: 2, c: "3" } : [1, 2, 3];
      var mutprom = mapLike(name) ? {a: "a", b: 2, c: Promise.resolve("3") } : [1, Promise.resolve(2), 3];

      var value = Immutable[name](mutval);
      var prom = Immutable[name](mutprom);

      all(prom)
        .then(function(res) {
          if ( !res instanceof Immutable[name] ) {
            return done(new Error(`should return ${name}: ${res}`));
          }

          if ( !Immutable.is(value, res) ) {
            console.log('expected', value);
            console.log('got', res);
            return done(new Error('should return correct values'));
          }

          return done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

});
