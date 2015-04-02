import expect from './instrument'

import Immutable from 'immutable'
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

      expect(all(prom)).to
        .to.be.fulfilled
        .and.eventually.be.an.instanceof(Immutable[name])
        .and.eventually.satisfy(function(res) { return Immutable.is(res, value) })
        .and.notify(done);
    });
  });

});
