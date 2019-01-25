import { createButton, createElement } from '../lib/util.js';

export default class View {
  constructor(gridView, rootElement) {
    this.rootElement = rootElement;
    this.gridView = gridView;
    
    this._controls = {};
    this._controlElements = null;

    this._init();
  }
  _init() {
    this._createControls();
    this._render();
  }

  _createControls() {
    this._controls.startButton = createButton({
      className: 'material-icons',
      onclick: () => {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      }
      // textContent: 'play_arrow'
    }, 'play_arrow');

    this._controls.resetButton = createButton({
      className: 'material-icons',
      onclick: () => {
        this.reset();
      }
      // textContent: 'replay'
    }, 'replay');

    this._controls.randomizeButton = createButton({
      className: 'material-icons',
      onclick: () => {
        this.randomize();
      }
      // textContent: 'transform'
    }, 'transform');

    this._controls.speedSlider = createElement('input', {
      type: 'range',
      min: 0,
      max: 1000,
      step: 50,
      value: this.speed,
      onchange: ({ target }) => {
        this.changeSpeed(target.value);
        this.pause();
        this.play();
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
}
