function checkLength(startCoordX, startCoordY, endCoordX, endCoordY) {
  return (startCoordX === endCoordX
    ? endCoordY - startCoordY
    : endCoordX - startCoordX) + 1;
}

function createGrid() {
  const grid = new Array(10);
  for (let i = 0; i < 10; i += 1) {
    grid[i] = new Array(10);
  }
  return grid;
}

export default class Gameboard {
  constructor(player) {
    this.player = player;
    this.grid = createGrid();
  }

  getPlayer() {
    return this.player;
  }

  getGrid() {
    return this.grid;
  }

  setGrid(coords, value) {
    this.grid[coords[0]][coords[1]] = value;
  }

  checkGridCell(coordX, coordY) {
    return (this.grid[coordX - 1][coordY - 1]);
  }

  checkGridRow(startCoord, endCoord, anchor) {
    for (let i = startCoord; i <= endCoord; i += 1) {
      if (this.checkGridCell(i + 1, anchor + 1)) {
        return true;
      }
    }
    return false;
  }

  placeShip(ship, startCoordX, startCoordY, endCoordX, endCoordY) {
    // Check if ship length matches length of coordinates
    if (ship.getLength() === checkLength(startCoordX, startCoordY, endCoordX, endCoordY)) {
      // Set start and end coordinates of ship based on rotation
      const start = (ship.getRotated() ? startCoordX : startCoordY) - 1;
      const end = (ship.getRotated() ? endCoordX : endCoordY) - 1;
      const anchor = (ship.getRotated() ? startCoordY : startCoordX) - 1;
      // Check if all spaces are clear for ship placement
      if (!this.checkGridRow(start, end, anchor)) {
        let shipPos = 1;
        for (let i = start; i <= end; i += 1) {
          const coords = ship.getRotated() ? [i, anchor] : [anchor, i];
          this.setGrid(coords, [ship, shipPos]);
          shipPos += 1;
        }
      }
    }
  }

  receiveAttack(coordX, coordY) {
    const cell = this.checkGridCell(coordX, coordY);
    // Check if cell has already been attacked and missed
    if (cell !== 'miss') {
      // Check if ship exists
      if (cell) {
        // Check if ship has been hit and mark hit if not
        if (!cell[0].getHits()[cell[1] - 1]) {
          cell[0].hit(cell[1]);
        }
      } else {
        // If not a ship and has not been hit, then mark miss
        this.setGrid([coordX - 1, coordY - 1], 'miss');
      }
    }
  }

  checkAllShipsSunk() {
    // Condense all column cells into single array of ships
    const grid = this.getGrid().flat().filter((cell) => typeof cell === 'object');
    return grid.every((cell) => cell[0].getSunk() === true);
  }
}

module.exports = Gameboard;
