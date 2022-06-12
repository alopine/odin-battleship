import Display from './Display';
import Player from './Player';
import Gameboard from './Gameboard';

let player;
let computer;
let playerBoard;
let computerBoard;
let shipMouseHover = false;
let shipMove;

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
  }

  static resetGame() {
    Display.clearBoards();
    this.initializeGame();
  }

  static addListeners() {
    this.addPlayerBoardListener();
    this.addRandomizeListener();
    this.addStartGameListener();
    this.addComputerBoardListener();
    this.addRestartListener();
  }

  static addPlayerBoardListener() {
    document
      .getElementById('playerBoard')
      .querySelectorAll('div')
      .forEach((cell) => {
        cell.addEventListener('click', (e) => {
          const { x, y } = cell.dataset;
          if (cell.classList.contains('ship') && !shipMouseHover) {
            const ship = playerBoard.checkGridCell(x, y)[0];
            shipMouseHover = true;
            shipMove = ship;
            Display.renderShipPlacementHover(cell.innerText, ship);
            this.addPlayerShipHoverListener(ship);
            // Upon clicking, set hover to mouse location
            const shipHover = document.getElementById('shipHover');
            shipHover.style.left = `${e.clientX}px`;
            shipHover.style.top = `${e.clientY}px`;
          } else if (!cell.classList.contains('ship') && shipMouseHover) {
            playerBoard.moveShip(shipMove, [Number.parseInt(x, 10), Number.parseInt(y, 10)]);
            Display.removeShipPlacementHover();
            this.removePlayerShipHoverListener(shipMove);
            shipMouseHover = false;
            Display.clearBoards();
            Display.createBoard(document.getElementById('playerBoard'));
            Display.renderPlayerBoard(playerBoard);
            this.addPlayerBoardListener();
          }
        });
      });
  }

  // TODO: Find a way to remove duplicate listeners

  static addPlayerShipHoverListener(ship) {
    document.addEventListener('mousemove', this.playerShipHoverEvent);
    document.addEventListener('keydown', this.playerShipRotateEvent);
  }

  static removePlayerShipHoverListener(ship) {
    document.removeEventListener('mousemove', (e) => {
      this.playerShipHoverEvent(e);
    });
    document.removeEventListener('keydown', (e) => {
      this.playerShipRotateEvent(e, ship);
    });
    console.log('removed');
  }

  static playerShipHoverEvent(e) {
    const shipHover = document.getElementById('shipHover');
    if (shipHover) {
      shipHover.style.left = `${e.clientX}px`;
      shipHover.style.top = `${e.clientY}px`;
    }
  }

  static playerShipRotateEvent(e, ship) {
    if (e.code === 'KeyR') {
      const shipHover = document.getElementById('shipHover');
      if (shipHover) {
        ship.toggleRotated();
        Display.toggleShipHoverRotation();
        console.log('toggled');
      }
    }
  }

  static addRandomizeListener() {
    document.getElementById('randomizeBoard').addEventListener('click', () => {
      this.resetGame();
    });
  }

  static addStartGameListener() {
    document.getElementById('startGame').addEventListener('click', () => {
      Display.startGame();
      Display.clearBoards();
      Display.createBoard(document.getElementById('playerBoard'));
      Display.renderPlayerBoard(playerBoard);
      Display.createBoard(document.getElementById('computerBoard'));
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
            if (!computerBoard.checkAllShipsSunk()) {
              const coords = computer.computerTurn(playerBoard);
              Display.renderCell(
                playerBoard,
                coords[0],
                coords[1],
                playerBoard.checkGridCell(coords[0], coords[1]),
              );
            }
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

  static addRestartListener() {
    document.getElementById('restartGame').addEventListener('click', () => {
      this.resetGame();
      Display.restartGame();
    });
  }
}
