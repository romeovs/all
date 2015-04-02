'use strict';
import chai from 'chai'
import cas  from 'chai-as-promised'

chai.use(cas);
var expect = chai.expect;

import all from '../src'

var mkPromise = function(val) {
  return Promise.resolve(val);
};

describe('values', function() {
  it('should resolve numbers to numbers', function(done) {
    expect(all(10)).to
      .eventually.be.a('number')
      .and.eventually.equal(10)
      .and.notify(done);
  });

  it('should resolve strings to strings', function(done) {
    expect(all('ok')).to
      .eventually.be.a('string')
      .and.eventually.equal('ok')
      .and.notify(done);
  });

  it('should resolve dates to dates', function(done) {
    var d = new Date();
    expect(all(d)).to
      .eventually.be.a('date')
      .and.eventually.equal(d)
      .and.notify(done);
  });

  it('should resolve true to true', function(done) {
    expect(all(true)).to
      .eventually.be.a('boolean')
      .and.eventually.equal(true)
      .and.notify(done);
  });

  it('should resolve false to false', function(done) {
    expect(all(false)).to
      .eventually.be.a('boolean')
      .and.eventually.equal(false)
      .and.notify(done);
  });
});

describe('non-values', function() {
  it('should resolve undefined to undefined', function(done) {
    expect(all(undefined)).to
      .eventually.be.an('undefined')
      .and.eventually.equal(undefined)
      .and.notify(done);
  });

  it('should resolve null to null', function(done) {
    expect(all(null)).to
      .eventually.be.a('null')
      .and.eventually.equal(null)
      .and.notify(done);
  });
});


describe('arrays', function() {
  it('should resolve all array elements', function(done) {
    var arr = [1, 'a', true];
    var promises = arr.map(el => Promise.resolve(el));
    expect(all(promises)).to
      .eventually.be.an('array')
      .and.eventually.deep.equal(arr)
      .and.notify(done);
  });

  it('should should reject if one of the elements rejects', function(done) {
    var arr = [1, 'a', true];
    var promises = arr.map(el => Promise.resolve(el));
    promises[1] = Promise.reject('FAIL');

    expect(all(promises)).to
      .eventually.be.rejectedWith('FAIL')
      .and.notify(done);
  });

  it('should should leave non-promise elements alone', function(done) {
    var arr = [1, 1, mkPromise(1)];

    expect(all(arr)).to
      .and.eventually.deep.equal([1, 1, 1])
      .and.notify(done);
  });
});

describe('objects', function() {
  it('should resolve all object keys', function(done) {
    var obj = {
      a: mkPromise('a')
    , b: mkPromise(1)
    , c: mkPromise(true)
    };

    expect(all(obj)).to
      .eventually.be.an('object')
      .and.eventually.deep.equal({a: 'a', b: 1, c: true})
      .and.notify(done);
  });

  it('should reject when one key rejects', function(done) {
    var obj = {
      a: Promise.reject('FAIL')
    , b: mkPromise(1)
    , c: mkPromise(true)
    };

    expect(all(obj)).to
      .eventually.be.rejectedWith('FAIL')
      .and.notify(done);
  });

  it('should leave non-promise elements alone', function(done) {
    var obj = {
      a: 1
    , b: mkPromise(1)
    , c: undefined
    };

    expect(all(obj)).to
      .eventually.be.deep.equal({a: 1, b: 1, c: undefined})
      .and.notify(done);
  });

});

var ids = 'abcdefghijk';
var max = 10;
var createNested = function(depth, prom) {
  var random = Math.random();
  var val, prom;
  if ( depth <= max ) {
    // create structure
    if ( !prom && random < 0.5 ) {
      // create promise
      var [v, p] = createNested(depth, true);
      val  = v;
      prom = mkPromise(p);
    } else if ( random < 0.75 ) {
      // create array
      var l = Math.round(Math.random() * 2);
      val  = new Array(l);
      prom = new Array(l);
      for ( var i = 0; i < l; i++ ) {
          var [v, p] = createNested(depth + 1, prom);
          val[i]  = v;
          prom[i] = p;
      }
    } else {
      // create object
      val  = {};
      prom = {};
      for ( var i = 0; i < 2; i++ ) {
        var [v, p] = createNested(depth + 1, prom);
        prom[ids[i]] = p;
        val[ids[i]]  = v;
      }
    }
  } else {
    if ( !prom ) {
      // create promise
      var [v, p] = createNested(depth, true);
      val  = v;
      prom = mkPromise(p);
    } else {
      // create value
      val = prom = 1;
    }
  }

  return [val, prom];
};


describe('nested structures', function() {
  it('should resolve nested structures', function(done) {
    var [val, prom] = createNested(0, false);
    expect(all(prom)).to
      .eventually.deep.equal(val)
      .and.notify(done);
  });
});
