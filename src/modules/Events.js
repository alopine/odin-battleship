import Display from './Display';
import Player from './Player';
import Gameboard from './Gameboard';

let player;
let computer;
let playerBoard;
let computerBoard;

export default class Events {
  static loadPage() {
    this.initializeGame();
    this.addListeners();
  }

  static initializeGame() {
    player = new Player(false);
    computer = new Player(true);
    playerBoard = new Gameboard(player);
    computerBoard = new Gameboard(computer);
    playerBoard.placeAllShips();
    Display.createBoard(document.getElementById('playerBoard'));
    Display.renderPlayerBoard(playerBoard);
    Display.createBoard(document.getElementById('computerBoard'));
  }

  static resetGame() {
    Display.clearBoards();
    this.initializeGame();
  }

  static addListeners() {
    this.addRandomizeListener();
    this.addStartGameListener();
    this.addComputerBoardListener();
    this.addRestartListener();
  }

  static addRandomizeListener() {
    document.getElementById('randomizeBoard').addEventListener('click', () => {
      this.resetGame();
    });
  }

  static addStartGameListener() {
    document.getElementById('startGame').addEventListener('click', () => {
      Display.startGame();
      computerBoard.placeAllShips();
      this.addComputerBoardListener();
    });
  }

  static addComputerBoardListener() {
    document
      .getElementById('computerBoard')
      .querySelectorAll('div')
      .forEach((cell) => {
        cell.addEventListener('click', () => {
          const { x, y } = cell.dataset;
          if (
            !computerBoard.checkAllShipsSunk()
            && !playerBoard.checkAllShipsSunk()
            && computerBoard.receiveAttack(x, y)
          ) {
            computerBoard.receiveAttack(x, y);
            Display.renderCell(
              computerBoard,
              x,
              y,
              computerBoard.checkGridCell(x, y),
            );
            const coords = computer.computerTurn(playerBoard);
            Display.renderCell(
              playerBoard,
              coords[0],
              coords[1],
              playerBoard.checkGridCell(coords[0], coords[1]),
            );
          }
          if (
            computerBoard.checkAllShipsSunk()
            || playerBoard.checkAllShipsSunk()
          ) {
            const won = computerBoard.checkAllShipsSunk();
            Display.endGame(won);
          }
        });
      });
  }

  // Restart Game Listener
  static addRestartListener() {
    document.getElementById('restartGame').addEventListener('click', () => {
      this.resetGame();
      Display.restartGame();
    });
  }
}
