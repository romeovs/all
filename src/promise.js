export default {
  check(thing) {
    return thing instanceof Promise;
  }

, realise(thing) {
    return thing;
  }
};
