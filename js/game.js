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

    this.init();
  }

  init() {
    this.root.appendChild(this.grid.element);
    this.root.appendChild(this._createControls());
    
  }

  _createControls() {
    const startButton = createButton({
      className: 'material-icons',
      textContent: 'play_arrow'
    });
    const resetButton = createButton({
      className: 'material-icons',
      textContent: 'replay'
    });
    const randomizeButton = createButton({
      className: 'material-icons',
      textContent: 'transform'
    });
    const speedSlider = createElement('input', {
      type: 'range',
      min: 0,
      max: 900,
      step: 50
    });
    const container = createElement('div', {
      className: 'controls'
    });

    container.append(startButton, resetButton, randomizeButton, speedSlider);

    return container;
  }
}