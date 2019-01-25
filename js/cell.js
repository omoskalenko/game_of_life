export default class Cell {
  constructor(row, col, alive = false) {
    this.row = row;
    this.col = col;
    this._isAlive = alive;
  }

  get isAlive() {
    return this._isAlive;
  }

  set isAlive(state) {
    this._isAlive = state;
  }
  
  toggleState() {
    this._isAlive = !this._isAlive;
  }

  resetState() {
    this._isAlive = false;
  }

  setRandomeState() {
    this._isAlive = !!Math.round(Math.random());
  }

}