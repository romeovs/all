import { expect, describe, it, lab } from './instrument'
export { lab }

import all from '../src'
import { Maybe, just, nothing } from './maybe'

var hook = {
  check(thing) {
    return thing instanceof Maybe;
  }

, async realise(thing) {
    if ( thing instanceof Maybe.Just ) {
      var value = await all(thing.value);
      return just(value);
    } else {
      return nothing;
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

    var m = just(Promise.resolve(10));
    expect(all(m)).to
      .to.be.fulfilled
      .and.eventually.have.property('value')
        .that.deep.equals(10)
      .and.notify(done);
  });

  it('should work recursivly', function(done) {
    all.addHook(hook);
    var m = just([1, Promise.resolve(2), Promise.resolve(just(3))]);
    expect(all(m)).to
      .to.be.fulfilled
      .and.eventually.have.property('value')
        .that.deep.equals([1, 2, just(3)])
      .and.notify(done);
  });

  it('should throw when invalid hooks are added', function(done) {
    expect(function() {
      all.addHook({});
    }).to.throw(/invalid hook/);
    done();
  });

  it('should catch faulty hooks', function(done) {
    var ok = true;
    all.addHook({
      check: function() {
        if ( ok ) {
          ok = false;
          throw 'FAIL';
        }
        return false;
      }
    , realise: function() {

      }
    });

    expect(all([])).to
      .be.rejectedWith('FAIL')
      .and.notify(done);

  });
});
