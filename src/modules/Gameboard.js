import Ship from './Ship';

function checkLength(startCoordX, startCoordY, endCoordX, endCoordY) {
  return (
    (startCoordX === endCoordX
      ? endCoordY - startCoordY
      : endCoordX - startCoordX) + 1
  );
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
    this.getGrid()[coords[0]][coords[1]] = value;
  }

  checkGridCell(coordX, coordY) {
    return this.getGrid()[coordX][coordY];
  }

  checkGridRow(rotated, startCoord, endCoord, anchor) {
    try {
      for (let i = startCoord; i <= endCoord; i += 1) {
        if (rotated && this.checkGridCell(i, anchor)) {
          return true;
        }
        if (!rotated && this.checkGridCell(anchor, i)) {
          return true;
        }
      }
    } catch (error) {
      return true;
    }
    return false;
  }

  placeShip(ship, startCoordX, startCoordY, endCoordX, endCoordY) {
    // Check if ship length matches length of coordinates
    if (
      ship.getLength() === checkLength(startCoordX, startCoordY, endCoordX, endCoordY)
    ) {
      // Set start and end coordinates of ship based on rotation
      const start = ship.getRotated() ? startCoordX : startCoordY;
      const end = ship.getRotated() ? endCoordX : endCoordY;
      const anchor = ship.getRotated() ? startCoordY : startCoordX;
      // Check if all spaces are clear for ship placement
      if (!this.checkGridRow(ship.getRotated(), start, end, anchor)) {
        let shipPos = 0;
        for (let i = start; i <= end; i += 1) {
          const coords = ship.getRotated() ? [i, anchor] : [anchor, i];
          this.setGrid(coords, [ship, shipPos]);
          shipPos += 1;
        }
      }
    }
  }

  placeAllShips() {
    const ships = [
      'Carrier',
      'Battleship',
      'Destroyer',
      'Submarine',
      'Patrol Boat',
    ];
    ships.forEach((ship) => {
      // Initialize new ship
      const newShip = new Ship(ship);
      // Randomly decide if ship is rotated
      if (Math.floor(Math.random() * 2)) {
        newShip.toggleRotated();
      }
      // Declare coordinates
      let start;
      let end;
      let anchor;
      let startCoordX;
      let startCoordY;
      let endCoordX;
      let endCoordY;
      let checkStart;
      let checkEnd;
      // Loop for generating coordinates
      do {
        start = Math.floor(Math.random() * (11 - newShip.getLength()));
        end = start + newShip.getLength() - 1;
        anchor = Math.floor(Math.random() * 10);
        // Assign coordinates based on rotation
        startCoordX = newShip.getRotated() ? start : anchor;
        startCoordY = newShip.getRotated() ? anchor : start;
        endCoordX = newShip.getRotated() ? end : anchor;
        endCoordY = newShip.getRotated() ? anchor : end;
        // Assign coordinates for checking function
        checkStart = newShip.getRotated() ? startCoordX : startCoordY;
        checkEnd = newShip.getRotated() ? endCoordX : endCoordY;
      } while (this.checkGridRow(newShip.getRotated(), checkStart, checkEnd, anchor));
      // Place ship
      this.placeShip(newShip, startCoordX, startCoordY, endCoordX, endCoordY);
    });
  }

  receiveAttack(coordX, coordY) {
    const cell = this.checkGridCell(coordX, coordY);
    // Check if cell has already been attacked and missed
    if (cell !== 'miss') {
      // Check if ship exists
      if (cell) {
        // Check if ship has been hit and mark hit if not
        if (!cell[0].getHits()[cell[1]]) {
          cell[0].hit(cell[1]);
        }
      } else {
        // If not a ship and has not been hit, then mark miss
        this.setGrid([coordX, coordY], 'miss');
      }
    }
  }

  checkAllShipsSunk() {
    // Condense all column cells into single array of ships
    const grid = this.getGrid()
      .flat()
      .filter((cell) => typeof cell === 'object');
    return grid.every((cell) => cell[0].getSunk() === true);
  }
}
