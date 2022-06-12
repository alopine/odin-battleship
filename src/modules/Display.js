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
    document.getElementById(boardID).querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add(cellClass);
    // If computer board and result was hit
    // Get name of ship from board coordinates
    // Take first letter
    // Put into innerText of cell
  }

  static endGame(won) {
    document.getElementById('playerSection').classList.add('hidden');
    document.getElementById('computerSection').classList.add('hidden');
    document.getElementById('winnerMessage').innerText = won ? 'You won!' : 'You lost!';
    document.getElementById('gameEndScreen').classList.remove('hidden');
  }

  static restartGame() {
    document.getElementById('gameEndScreen').classList.add('hidden');
    document.getElementById('playerSection').classList.remove('hidden');
    document.getElementById('shipSelectionSection').classList.remove('hidden');
  }

  // Placing ship
    // After clicking and selecting a shift, erase where the previous row of divs was
    // Have the same set of divs hovering on mouse
}
