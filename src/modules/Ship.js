export default class Ship {
  constructor(length) {
    this.length = length;
    this.rotated = false;
    this.hits = new Array(this.length).fill(false);
    this.sunk = false;
  }

  getLength() {
    return this.length;
  }

  getRotated() {
    return this.rotated;
  }

  toggleRotated() {
    this.rotated = !this.rotated;
    return this.rotated;
  }

  getHits() {
    return this.hits;
  }

  hit(number) {
    if (number <= this.hits.length) {
      this.hits[number - 1] = true;
    }
    this.isSunk();
    return this.hits;
  }

  getSunk() {
    return this.sunk;
  }

  isSunk() {
    this.sunk = this.hits.every((pos) => pos);
    return this.sunk;
  }
}

module.exports = Ship;
