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

    this.init();
    this.randomize();
  }
  _forEachCell(fn) {
    for (let i = 0; i < this.gridRows; i++) {
      for (let j = 0; j < this.gridCols; j++) {
        const cell = this.grid[i][j];
        fn(cell);
      }
    }
  }

  init() {
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
  
}