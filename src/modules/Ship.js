class Ship {
  constructor(length) {
    this.length = length;
    this.hits = new Array(this.length).fill(false);
    this.sunk = false;
  }

  getLength() {
    return this.length;
  }

  getHits() {
    return this.hits;
  }

  hit(number) {
    if (number <= this.hits.length) {
      this.hits[number - 1] = true;
    }
    return this.hits;
  }

  getSunk() {
    return this.sunk;
  }

  isSunk() {
    return this.hits.every((pos) => pos);
  }
}

module.exports = Ship;
