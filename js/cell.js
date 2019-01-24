class Cell {
  constructor(width, height, row, col, alive = false) {
    this.row = row;
    this.col = col;
    this.isAlive = alive;
    this.element = null;

    this.width = width;
    this.hight = height;
    this.init();
  }

  init() {
    const td = document.createElement('td');
    td.className = 'cell';
    td.style.width = this.width;
    td.style.hight = this.hight;

    this.element = td;
  }
}