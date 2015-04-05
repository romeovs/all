export default {
  check(thing) {
    return thing instanceof Promise;
  }

, realise(thing, all) {
    return thing;
  }
};
