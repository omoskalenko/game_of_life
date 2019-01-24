/*global Cell */
class Grid {
  constructor(gridWidth, gridHight, gridRows, gridCols) {
    this.gridWidth = gridWidth;
    this.gridHight = gridHight;
    this.gridRows = gridRows;
    this.gridCols = gridCols;

    this.grid = [];
    this.nextGrid = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.gridRows; i++) {
      this.grid[i] = [];
      this.nextGrid[i] = [];
      for (let j = 0; j < this.gridCols; j++) {
        this.grid[i][j] = new Cell(i, j);
        this.nextGrid[i][j] = false;
      }
    }
  }
}