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

    this.onCellStateChange(cell);
  }

  next() {
    const nextGrid =  this._grid.next();
    this.onGridStateChange(nextGrid);
  }

  play() {
    this.isPlaying = true;
    this._starInterval();
    
  }

  pause() {
    this.isPlaying = false;
    this._stopInterval();
  }

  reset() {
    this.pause();
    const resetGrid = this._grid.reset();
    this.onGridStateChange(resetGrid);
  }

  toggle() {
    if(this.isPlaying) {
      this.pause();
    } else {
      this.play;
    }
  }

  randomize() {
    if(this.isPlaying) return;
    const randomeGrid = this._grid.randomize();
    this.onGridStateChange(randomeGrid);
  }

  changeSpeed(value) {
    this.speed = 1000 - value;
  }

  _starInterval() {
    this.interval = setInterval(this.next, this.speed);
  }

  _stopInterval() {
    clearInterval(this.interval);
  }
}