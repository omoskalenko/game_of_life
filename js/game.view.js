import { createButton, createElement } from './lib/util.js';
function _createControls() {
  const startButton = createButton({
    className: 'material-icons',
    textContent: 'play_arrow'
  });
  startButton.addEventListener('click', () => {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  });
  this.controls.startButton = startButton;
  const resetButton = createButton({
    className: 'material-icons',
    textContent: 'replay'
  });
  resetButton.addEventListener('click', () => {
    this.reset();
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
    step: 50,
    value: this.speed
  });
  speedSlider.addEventListener('change', ({ target }) => {
    this.changeSpeed(target.value);
    this.pause();
    this.play();
  });

  const container = createElement('div', {
    className: 'controls'
  }, startButton, resetButton, randomizeButton, speedSlider);

  return container;
}