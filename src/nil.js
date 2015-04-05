export default {
  check(thing) {
    return thing === undefined || thing === null;
  }

, realise(thing, all) {
    return Promise.resolve(thing);
  }
};
