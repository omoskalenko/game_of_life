import { createButton, createElement } from '../lib/util.js';

export default class GridView {
  constructor(width, heigth, rows, cols) {
    this.gridWidth = width;
    this.gridHeight = heigth;
    this.cellWidth = width / cols;
    this.cellHeight = heigth / rows;
    this.rows = rows;
    this.cols = cols;

    this.onClick = Function.prototype;
  }

  get element( ) {
    throw new Error('Abstract property'); 
  }

  update(grid) {
    throw new Error('Abstract method'); 
  }

  reset() {
    throw new Error('Abstract method'); 
  }
}