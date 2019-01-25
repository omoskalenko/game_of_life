import Cell from '../cell/cell.js';

export default class Grid {
  constructor(gridRows, gridCols) {
    this._gridRows = gridRows;
    this._gridCols = gridCols;

    this._grid = [];
    this._nextGrid = [];

    this._init();
  }

  toggleCellState(row, col) {
    const cell = this._grid[row][col];

    cell.toggleState();

    return this._grid;
  }

  next() {
    //Применяем правила для всех ячеек в новую сетку
    this._forEachCell(cell => {
      const numberOfNeighborth = this._countOfNeighborth(cell);

      if(cell.isAlive) {
        if (numberOfNeighborth < 2) {
          // Cell dies
          this._nextGrid[cell.row][cell.col] = false;
        } else if (numberOfNeighborth === 2 || numberOfNeighborth === 3) {
          // Cell lives
          this._nextGrid[cell.row][cell.col] = true;
        } else if (numberOfNeighborth > 3) {
          // Cell dies
          this._nextGrid[cell.row][cell.col] = false;
        }
      } else {
        if (numberOfNeighborth === 3) {
          // Cell lives
          this._nextGrid[cell.row][cell.col] = true;
        }
      }
    });
    //Копируем состояния ячеек из новой сетки в основную
    this._forEachCell(cell => {
      cell.isAlive = this._nextGrid[cell.row][cell.col];
      this._nextGrid[cell.row][cell.col] = false;
    });

    return this._grid;
  }

  reset() {
    this._forEachCell(cell => cell.resetState());
    return this._grid;
  }

  randomize() {
    this._forEachCell(cell => cell.setRandomeState());
    return this._grid;
  }

  _init() {
    for (let i = 0; i < this._gridRows; i++) {
      this._grid[i] = [];
      this._nextGrid[i] = [];
      for (let j = 0; j < this._gridCols; j++) {
        const cell = new Cell(i, j); // композиция
        this._grid[i][j] = cell;
        this._nextGrid[i][j] = false;
      }
    }
  }

  _countOfNeighborth({ row, col }) {
    let count = 0;

    if(this._isCellAlive(row - 1, col - 1)) count ++;
    if(this._isCellAlive(row - 1, col))     count ++;
    if(this._isCellAlive(row - 1, col + 1)) count ++;
    if(this._isCellAlive(row, col + 1))     count ++;
    if(this._isCellAlive(row + 1, col + 1)) count ++;
    if(this._isCellAlive(row + 1, col))     count ++;
    if(this._isCellAlive(row + 1, col - 1)) count ++;
    if(this._isCellAlive(row, col - 1))     count ++;

    return count;
  }

  _isCellAlive(row, col) {
    // if (this.grid[row][col] == 1) return false;
    if ( !this._grid[row] || !this._grid[row][col]) return false;

    return this._grid[row][col].isAlive;
  }
  
  _forEachCell(fn) {
    for (let i = 0; i < this._gridRows; i++) {
      for (let j = 0; j < this._gridCols; j++) {
        const cell = this._grid[i][j];
        fn(cell);
      }
    }
  }
}