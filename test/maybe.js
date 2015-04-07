export class Maybe { }

class Nothing extends Maybe {
  toString() {
    return 'Nothing';
  }
}

var nothing = new Nothing();

class Just extends Maybe {
  constructor(a) {
    this.value = a;
  }

  toString() {
    return `Just(${this.value})`;
  }
}

var just = function(val) {
  return new Just(val);
};

export { just, nothing };
