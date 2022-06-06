function assignLength(name) {
  switch (name) {
    case 'Carrier':
      return 5;
    case 'Battleship':
      return 4;
    case 'Destroyer':
      return 3;
    case 'Submarine':
      return 3;
    case 'Patrol Boat':
      return 2;
    default:
      return 0;
  }
}

export default class Ship {
  constructor(name) {
    this.name = name;
    this.length = assignLength(name);
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
