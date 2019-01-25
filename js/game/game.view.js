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

  updateGrid(grid) {
    this.gridView.update(grid);
  }

  resetControls() {
    this._controls.startButton.textContent = 'play_arrow';
    this._controls.startButton.title = 'Запустить игру';
    this._controls.speedSlider.value = 0;
  }

  _createControls() {
    this._controls.startButton = createButton({
      className: 'material-icons',
      onclick: () => this.onStartButtonClick()
    }, 'play_arrow');

    this._controls.resetButton = createButton({
      className: 'material-icons',
      onclick: () => this.onResetButtonClick()
    }, 'replay');

    this._controls.randomizeButton = createButton({
      className: 'material-icons',
      onclick: () => this.onRandomizeButtonClick()
      // textContent: 'transform'
    }, 'transform');

    this._controls.speedSlider = createElement('input', {
      type: 'range',
      min: 0,
      max: 1000,
      step: 50,
      value: this.speed,
      onchange: ({ target }) => {
        this.onSpeedSliderChenge(Number(target.value));
      }
    });

    this._controlElements = createElement('div', {
      className: 'controls'
    }, this._controls.startButton, 
    this._controls.resetButton,
    this._controls.randomizeButton,
    this._controls.speedSlider);
  }

  _render() {
    this.rootElement.appendChild(this.gridView.element);
    this.rootElement.appendChild(this._controlElements);
    
  }

  _handleStartButtonClick() {
    this.onStartButtonClick();
  }
}
