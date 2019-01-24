class Cell {
  constructor(row, col, alive = false) {
    this.row = row;
    this.col = col;
    this.isAlive = alive;
    this.element = null;

    this.init();
  }

  init() {
    const td = document.createElement('td');
    td.className = 'cell';
    this.element = td;
  }
}