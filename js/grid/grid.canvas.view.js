import { createButton, createElement } from '../lib/util.js';

export default class CanvasGridView {
  constructor() {
    this.gridWidth = width;
    this.gridHeigth = heigth;
    this.cellWidth = width / cols;
    this.cellHeight = heigth / rows;
    this.rows = rows;
    this.cols = cols;

    this._canvas = null;
    this.onClick = Function.prototype;
    this._init();
  }

  get element( ) {
    return this._canvas;
  }

  updateCell() {

  }

  update() {

  }
}