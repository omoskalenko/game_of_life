import { createButton, createElement } from '../lib/util.js';

export default class View {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.controls = {};


    this._init();
  }
  _init() {
    this._createControls();
    this._render();
  }

  _createControls() {
    this.controls.startButton = createButton({
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

    this.controls.resetButton = createButton({
      className: 'material-icons',
      onclick: () => {
        this.reset();
      }
      // textContent: 'replay'
    }, 'replay');

    this.controls.randomizeButton = createButton({
      className: 'material-icons',
      onclick: () => {
        this.randomize();
      }
      // textContent: 'transform'
    }, 'transform');

    this.controls.speedSlider = createElement('input', {
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

    this.controlElements = createElement('div', {
      className: 'controls'
    }, this.controls.startButton, 
    this.controls.resetButton,
    this.controls.randomizeButton,
    this.controls.speedSlider);
  }

  _render() {
    this.rootElement.appendChild(this.controlElements);
  }
}
