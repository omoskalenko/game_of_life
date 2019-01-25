import { createButton, createElement } from '../lib/util.js';

export default class GridView {
  constructor(width, heigth, rows, cols) {
    this.gridWidth = width;
    this.gridHeigth = heigth;
    this.cellWidth = width / cols;
    this.cellHeight = heigth / rows;
    this.rows = rows;
    this.cols = cols;

    this._table = null;

    this._init();
  }

  get element() {
    return this._table;
  }
  
  _init() {
    this._createTable();
  }

  _createTable() {
    const table = createElement('table', { className: 'grid' });
    for (let i = 0; i < this.rows; i++) {
      const row = createElement('tr', { className: 'row' });
      for (let j = 0; j < this.cols; j++) {
        const cell = createElement('td', {
          className: 'cell',
          width: this.cellWidth,
          height: this.cellHeight
        });
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    this._table = table;
  }
}