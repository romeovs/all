import { expect, describe, it, lab } from './instrument'
export { lab }

import all from '../src'
import Immutable from 'immutable'

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

      var mutval  = mapLike(name) ? {a: 'a', b: 2, c: '3' } : [1, 2, 3];
      var mutprom = mapLike(name) ? {a: 'a', b: 2, c: Promise.resolve('3') } : [1, Promise.resolve(2), 3];

      var value = Immutable[name](mutval);
      var prom = Immutable[name](mutprom);

      expect(all(prom)).to
        .to.be.fulfilled
        .and.eventually.be.an.instanceof(Immutable[name])
        .and.eventually.satisfy(function(res) { return Immutable.is(res, value); })
        .and.notify(done);
    });

    it('should work for empty immutable', function(done) {

      var empty = Immutable[name]();
      expect(all(empty)).to
        .to.be.fulfilled
        .and.eventually.be.an.instanceof(Immutable[name])
        .and.eventually.satisfy(function(res) { return Immutable.is(res, empty); })
        .and.notify(done);
    });

    it('should reject when something rejects', function(done) {
      var imm = mapLike(name) ? {a: Promise.reject('FAIL')} : [Promise.reject('FAIL')];
      expect(all(imm)).to
        .eventually.be.rejectedWith('FAIL')
        .and.notify(done);
    });

  });
});

describe('Immutable', function() {
  it('should not work on an unknown Immutable', function(done) {

    // create bad immutable that will look like one
    var val = {
      asMutable: true
    , forEach(fn) {
        fn(10);
      }
    , clear() {
        return val;
      }
    };

    expect(all(val)).to
      .eventually.be.rejected
      .and.notify(done);
  });
});
