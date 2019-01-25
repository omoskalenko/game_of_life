import { createButton, createElement } from '../lib/util.js';

export default class GridView {
  constructor(width, heigth, rows, cols) {
    this.gridWidth = width;
    this.gridHeigth = heigth;
    this.cellWidth = width / cols;
    this.cellHeight = heigth / rows;
    this.rows = rows;
    this.cols = cols;

    this.onClick = Function.prototype;
  }

  get element( ) {
    throw new Error('Abstract property'); 
  }

  updateCell(cell) {
    throw new Error('Abstract method'); 
  }

  updateGrid(grid) {
    throw new Error('Abstract method'); 
  }

  resetGrid() {
    throw new Error('Abstract method'); 
  }
}