export default {
  check(thing) {
    return thing === undefined || thing === null;
  }

, realise(thing) {
    return Promise.resolve(thing);
  }
};
