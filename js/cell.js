class Cell {
  constructor(width, height, row, col, alive = false) {
    this.row = row;
    this.col = col;
    this.isAlive = alive;
    this.element = null;

    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    const td = document.createElement('td');
    td.className = 'cell';
    td.width = this.width;
    td.height = this.height;

    this.element = td;
  }
}