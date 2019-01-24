/*global Grid, createButton, createElement, carry*/

class Game {
  constructor(gridWidth, gridHeight, gridRows, gridCols, rootElement) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.gridRows = gridRows;
    this.gridCols = gridCols;
    this.root = rootElement;

    this.grid = new Grid(gridWidth, gridHeight, gridRows, gridCols); //композиция
    this.isPlaying = false;
    this.speed = 1000;
    this.interval = null;
    this.element = null;

    this.next = this.next.bind(this);
    this._init();
  }

  next() {
    this.grid.next();
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
    this.grid.reset();
  }

  randomize() {
    if(this.isPlaying) return;
    this.reset();
    this.grid.randomize();
  }

  changeSpeed(target) {
    this.speed = 1000 - target.value;
  }

  _init() {
    this.root.appendChild(this.grid.element);
    this.root.appendChild(this._createControls());
  }

  _createControls() {
    const startButton = createButton({
      className: 'material-icons',
      textContent: 'play_arrow'
    });
    startButton.addEventListener('click', () => {
      if (this.isPlaying) {
        this.pause();
        startButton.textContent = 'play_arrow';
      } else {
        this.play();
        startButton.textContent = 'pause';
      }
    });
    const resetButton = createButton({
      className: 'material-icons',
      textContent: 'replay'
    });
    resetButton.addEventListener('click', () => {
      this.reset();
      startButton.textContent = 'play_arrow';
    });
    const randomizeButton = createButton({
      className: 'material-icons',
      textContent: 'transform'
    });
    randomizeButton.addEventListener('click', () => {
      this.randomize();
    });
    const speedSlider = createElement('input', {
      type: 'range',
      min: 0,
      max: 1000,
      step: 50
    });
    speedSlider.addEventListener('change', ({ target }) => {
      this.changeSpeed(target);
      this.pause();
      this.play();
    });

    const container = createElement('div', {
      className: 'controls'
    });

    container.append(startButton, resetButton, randomizeButton, speedSlider);

    return container;
  }

  _starInterval() {
    this.interval = setInterval(this.next, this.speed);
  }

  _stopInterval() {
    clearInterval(this.interval);
  }
}