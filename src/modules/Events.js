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
  }

  static addRandomizeListener() {
    document.getElementById('randomizeBoard').addEventListener('click', () => {
      this.resetGame();
    });
  }

  // Start game listener
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
            computerBoard.checkAllShipsSunk()
            || playerBoard.checkAllShipsSunk()
          ) {
            const won = computerBoard.checkAllShipsSunk();
            Display.endGame(won);
          } else if (computerBoard.receiveAttack(x, y)) {
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
        });
      });
  }

  // One turn is
  // Player clicks (computerBoard.receiveAttack()) until either hit or miss
  // Display render
  // Computer board checks if all ship sunk
  // If not, computer makes random attack on player board (computer.computerTurn(playerBoard);)
  // Display render
  // Player board checks if all ships sunk
  // If not, back to start of loop
}
