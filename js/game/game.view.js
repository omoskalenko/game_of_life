import { createButton, createElement } from '../lib/util.js';

export default class View {
  constructor(gridView, rootElement) {
    this.rootElement = rootElement;
    this.gridView = gridView;
    this._controls = {};
    this._controlElements = null;

    this.onGridClick = Function.prototype;
    this.onStartButtonClick = Function.prototype;
    this.onResetButtonClick = Function.prototype;
    this.onRandomizeButtonClick = Function.prototype;
    this.onSpeedSliderChenge = Function.prototype;

  }
  init() {
    this.gridView.onClick = this.onGridClick;
    this._createControls();
    this._render();
  }

  updateCell(cell) {
    this.gridView.updateCell(cell);
  }

  updateGrid(grid) {
    this.gridView.update(grid);
  }

  updateControls(isPlaying) {
    if (isPlaying) {
      this._controls.startButton.textContent = 'pause'; 
      this._controls.startButton.title = 'Остановить игру'; 
      this._controls.randomizeButton.disabled = true;
    } else {
      this._controls.startButton.textContent = 'play_arrow'; 
      this._controls.startButton.title = 'Запустить игру'; 
      this._controls.randomizeButton.disabled = false;
    }
  } 

  resetControls() {
    this._controls.startButton.textContent = 'play_arrow';
    this._controls.startButton.title = 'Запустить игру';
    this._controls.speedSlider.value = 450;
    this._controls.randomizeButton.disabled = false;
  }

  _createControls() {
    const startButton = createButton({
      className: 'material-icons',
      onclick: () => this.onStartButtonClick()
    }, 'play_arrow');

    const resetButton = createButton({
      className: 'material-icons',
      onclick: () => this.onResetButtonClick()
    }, 'replay');

    const randomizeButton = createButton({
      className: 'material-icons',
      onclick: () => this.onRandomizeButtonClick()
      // textContent: 'transform'
    }, 'transform');

    const speedSlider = createElement('input', {
      type: 'range',
      min: 16,
      max: 1000,
      step: 10,
      value: 450,
      onchange: ({ target }) => {
        this.onSpeedSliderChenge(Number(target.value));
      }
    });
    this._controls = {startButton, resetButton, randomizeButton, speedSlider };
    
    this._controlElements = createElement('div', {
      className: 'controls'
    }, startButton, 
    resetButton,
    randomizeButton,
    speedSlider);
  }

  _render() {
    this.rootElement.appendChild(this.gridView.element);
    this.rootElement.appendChild(this._controlElements); 
  }

}
