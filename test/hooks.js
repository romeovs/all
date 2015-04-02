'use strict';
import chai from 'chai'
import cas  from 'chai-as-promised'

chai.use(cas);
var expect = chai.expect;

import all from '../src'
import { Maybe, Just, Nothing } from './maybe'

var hook = {
  check(thing) {
    return thing instanceof Maybe;
  }

, async realise(thing, realise) {
    if ( thing.value ) {
      var value = await all(thing.value);
      return Just(value);
    } else {
      return Nothing;
    }
  }
};


describe('Hooks', function() {
  it('should allow addition of new types', function(done) {
    try {
      all.addHook(hook);
    } catch( err ) {
      done(err);
      return;
    }

    var m = Just(Promise.resolve(10));
    expect(all(m)).to
      .to.be.fulfilled
      .and.eventually.have.property('value')
        .that.deep.equals(10)
      .and.notify(done);
  });

  it('should work recursivly', function(done) {
    all.addHook(hook);
    var m = Just([1, Promise.resolve(2), Promise.resolve(Just(3))]);
    expect(all(m)).to
      .to.be.fulfilled
      .and.eventually.have.property('value')
        .that.deep.equals([1, 2, Just(3)])
      .and.notify(done);
  });

  it('should throw when invalid hooks are added', function(done) {
    expect(function() {
      all.addHook({})
    }).to.throw(/invalid hook/)
    done();
  });
});
