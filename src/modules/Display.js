export default class Display {
  static renderPlayerBoard(board) {
    const playerBoard = document.getElementById('playerBoard');
    const grid = board.getGrid();
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (grid[i][j]) {
          if (typeof grid[i][j] === 'object') {
            const cell = playerBoard.querySelector(`[data-x="${i + 1}"][data-y="${j + 1}"]`);
            cell.classList.add('ship');
            cell.innerText = grid[i][j][0].getName().charAt(0);
          }
        }
      }
    }
  }

  static clearBoard() {

  }

  // Placing ship
    // After clicking and selecting a shift, erase where the previous row of divs was
    // Have the same set of divs hovering on mouse
}
