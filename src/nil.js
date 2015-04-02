'use strict';
import realise from './'

export default {
  check(thing) {
    return thing === undefined || thing === null;
  }

, realise(thing, realise) {
    return Promise.resolve(thing);
  }
};
