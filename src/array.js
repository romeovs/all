export default {
  // wether or not something is an array
  check(thing) {
    return thing instanceof Array;
  }

  // realise everything in array
, realise(thing, all) {
    return Promise.all(thing.map(all));
  }
};
