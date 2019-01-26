import Grid from '../grid/grid.js';

export default class Game {
  constructor(gridRows, gridCols) {
    this._grid = new Grid(gridRows, gridCols); //композиция
    this.isPlaying = false;
    this.speed = 450;
    this.interval = null;
    this.element = null;

    this.onCellStateChange = Function.prototype;
    this.onGridStateChange = Function.prototype;

    this.next = this.next.bind(this);
  }

  toggleCellState(row, col) {
    const cell = this._grid.toggleCellState(row, col);

    this.onGridStateChange(cell);

    return this._grid;
  }

  next() {
    const nextGrid =  this._grid.next();
    this.onGridStateChange(nextGrid);
    return this._grid;
  }

  play() {
    this.isPlaying = true;
    this._starInterval();
    return this._grid;
  }

  pause() {
    this.isPlaying = false;
    this._stopInterval();
    return this._grid;
  }

  reset() {
    this.pause();
    const resetGrid = this._grid.reset();
    this.onGridStateChange(resetGrid);
    return this._grid;
  }

  toggle() {
    if(this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this._grid;
  }

  randomize() {
    if(this.isPlaying) return;
    const randomeGrid = this._grid.randomize();
    this.onGridStateChange(randomeGrid);
    return this._grid;
  }

  changeSpeed(value) {
    this.speed = 1000 - value;
    this._stopInterval();
    this._starInterval();
    return this._grid;
  }

  _starInterval() {
    this.interval = setInterval(this.next, this.speed);
  }

  _stopInterval() {
    clearInterval(this.interval);
  }
}