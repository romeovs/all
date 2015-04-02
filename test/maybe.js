'use strict';

export class Maybe { };

class Nothing extends Maybe {
  toString() {
    return "Nothing";
  }
};
var nothing = new Nothing();
export { nothing as Nothing };

class Just extends Maybe {
  constructor(a) {
    this.value = a;
  }

  toString() {
    return `Just(${this.value})`;
  }
};

var just = function(val) {
  return new Just(val);
};
export { just as Just };
