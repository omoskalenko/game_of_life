/*global Cell */
class Grid {
  constructor(gridWidth, gridHeight, gridRows, gridCols) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridRows = gridRows;
    this.gridCols = gridCols;
    this.cellWidth = gridWidth / gridCols;
    this.cellHeight = gridHeight / gridRows;
    this.element = null;


    this.grid = [];
    this.nextGrid = [];

    this._init();
  }

  next() {
    this._forEachCell(cell => {
      const numberOfNeighborth = this._numberOfNeighborth(cell);

      if(cell.alive) {
        if (numberOfNeighborth < 2) {
          // Cell dies
          this.nextGrid[cell.row][cell.col] = false;
        } else if (numberOfNeighborth === 2 || numberOfNeighborth === 3) {
          // Cell lives
          this.nextGrid[cell.row][cell.col] = true;
        } else if (numberOfNeighborth > 3) {
          // Cell dies
          this.nextGrid[cell.row][cell.col] = false;
        }
      } else {
        if (numberOfNeighborth === 3) {
          // Cell lives
          this.nextGrid[cell.row][cell.col] = true;
        }
      }
    });

    this._forEachCell(cell => {
      cell.alive = this.nextGrid[cell.row][cell.col];
      this.nextGrid[cell.row][cell.col] = false;
    });
  }

  reset() {
    this._forEachCell(cell => {
      cell.alive = false;
    });
  }
  randomize() {
    this._forEachCell(cell => {
      cell.alive = !!Math.round(Math.random());
    });
  }

  _init() {
    const table = document.createElement('table');
    table.className = 'grid';

    for (let i = 0; i < this.gridRows; i++) {
      const tr = document.createElement('tr');
      tr.className = 'row';

      this.grid[i] = [];
      this.nextGrid[i] = [];
      for (let j = 0; j < this.gridCols; j++) {
        const cell = new Cell(this.cellWidth, this.cellHeight, i, j);
        this.grid[i][j] = cell;
        this.nextGrid[i][j] = false;

        tr.appendChild(cell.element);
      }

      table.appendChild(tr);
    }
    this.element = table;
  }
  _numberOfNeighborth({ row, col }) {
    let count = 0;

    if(this._isNeighborthAlive(row - 1, col - 1)) count ++;
    if(this._isNeighborthAlive(row - 1, col))     count ++;
    if(this._isNeighborthAlive(row - 1, col + 1)) count ++;
    if(this._isNeighborthAlive(row, col + 1))     count ++;
    if(this._isNeighborthAlive(row + 1, col + 1)) count ++;
    if(this._isNeighborthAlive(row + 1, col))     count ++;
    if(this._isNeighborthAlive(row + 1, col - 1)) count ++;
    if(this._isNeighborthAlive(row, col - 1))     count ++;

    return count;
  }
  _isNeighborthAlive(row, col) {
    // if (this.grid[row][col] == 1) return false;
    if ( !this.grid[row] || !this.grid[row][col]) return false;

    return this.grid[row][col].alive;
  }
  _forEachCell(fn) {
    for (let i = 0; i < this.gridRows; i++) {
      for (let j = 0; j < this.gridCols; j++) {
        const cell = this.grid[i][j];
        fn(cell);
      }
    }
  }
}