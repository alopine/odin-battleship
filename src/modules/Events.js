import Display from './Display';
import Player from './Player';
import Gameboard from './Gameboard';

export default class Events {
  static loadPage() {
    this.initializeGame();
  }

  static initializeGame() {
    const player = new Player(false);
    const computer = new Player(true);
    const playerBoard = new Gameboard(player);
    const computerBoard = new Gameboard(computer);
    playerBoard.placeAllShips();
    Display.renderPlayerBoard(playerBoard);
  }
}
