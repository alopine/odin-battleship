export default class Player {
  constructor(computer) {
    this.computer = computer;
    this.attacked = [];
  }

  makeAttack(board, coordX, coordY) {
    if (!this.attacked.includes(`(${coordX}, ${coordY})`)) {
      board.receiveAttack(coordX, coordY);
      this.attacked.push(`(${coordX}, ${coordY})`);
      return true;
    }
    return false;
  }

  generateAttack() {
    let coordX;
    let coordY;
    do {
      coordX = Math.floor(Math.random() * 10);
      coordY = Math.floor(Math.random() * 10);
    } while (this.attacked.includes(`(${coordX}, ${coordY})`));
    return [coordX, coordY];
  }

  computerTurn(board) {
    const [coordX, coordY] = this.generateAttack();
    this.makeAttack(board, coordX, coordY);
  }
}
