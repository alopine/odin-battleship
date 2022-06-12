export default class Display {
  static createBoard(board) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement('div');
        cell.dataset.x = j;
        cell.dataset.y = i;
        board.appendChild(cell);
      }
    }
  }

  static renderPlayerBoard(board) {
    const playerBoard = document.getElementById('playerBoard');
    const grid = board.getGrid();
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (grid[i][j]) {
          if (typeof grid[i][j] === 'object') {
            const cell = playerBoard.querySelector(`[data-x="${i}"][data-y="${j}"]`);
            cell.classList.add('ship');
            cell.innerText = grid[i][j][0].getName().charAt(0);
            cell.dataset.ship = cell.innerText;
          }
        }
      }
    }
  }

  static clearBoards() {
    const playerBoard = document.getElementById('playerBoard');
    const computerBoard = document.getElementById('computerBoard');
    playerBoard.innerHTML = '';
    computerBoard.innerHTML = '';
  }

  static startGame() {
    document.getElementById('computerSection').classList.remove('hidden');
    document.getElementById('shipSelectionSection').classList.add('hidden');
  }

  static renderCell(board, x, y, result) {
    const boardID = board.player.getComputer() ? 'computerBoard' : 'playerBoard';
    const cellClass = typeof result === 'object' ? 'hit' : 'miss';
    const cell = document.getElementById(boardID).querySelector(`[data-x="${x}"][data-y="${y}"]`);
    cell.classList.add(cellClass);
    if (boardID === 'computerBoard' && cellClass === 'hit') {
      const shipName = board.checkGridCell(x, y)[0].getName();
      cell.innerText = shipName.charAt(0);
    }
  }

  static endGame(won) {
    document.getElementById('winnerMessage').innerText = won ? 'You won!' : 'You lost!';
    document.getElementById('gameEndScreen').classList.remove('hidden');
  }

  static restartGame() {
    document.getElementById('gameEndScreen').classList.add('hidden');
    document.getElementById('computerSection').classList.add('hidden');
    document.getElementById('shipSelectionSection').classList.remove('hidden');
  }

  static renderShipPlacementHover(shipChar, ship) {
    // Clear original cells of selected ship
    const playerBoard = document.getElementById('playerBoard');
    const shipCells = playerBoard.querySelectorAll(`[data-ship="${shipChar}"]`);
    shipCells.forEach((shipCell) => {
      const cell = shipCell;
      delete cell.dataset.ship;
      cell.innerHTML = '';
      cell.classList.remove('ship');
    });
    // Create ship selection hover
    const shipHover = document.createElement('div');
    shipHover.id = 'shipHover';
    if (!ship.getRotated()) {
      shipHover.classList.add('shipHoverCol');
    }
    const length = ship.getLength();
    for (let i = 0; i < length; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('shipHoverCell');
      cell.innerText = shipChar;
      shipHover.appendChild(cell);
    }
    document.body.appendChild(shipHover);
  }

  static removeShipPlacementHover() {
    document.getElementById('shipHover').remove();
  }

  static toggleShipHoverRotation() {
    document.getElementById('shipHover').classList.toggle('shipHoverCol');
  }
}
