import Grid from '../grid/grid.js';

export default class Game {
  constructor(gridRows, gridCols) {
    this._grid = new Grid(gridRows, gridCols); //композиция
    this.isPlaying = false;
    this.speed = 450;
    this.interval = null;
    this.element = null;

    this.next = this.next.bind(this);
  }

  next() {
    this._grid.next();
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
    this._grid.reset();
  }

  randomize() {
    if(this.isPlaying) return;
    this.reset();
    this._grid.randomize();
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