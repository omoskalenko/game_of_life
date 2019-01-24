class Cell {
  constructor(width, height, row, col, alive = false) {
    this.row = row;
    this.col = col;
    this._isAlive = alive;
    this.element = null;

    this.width = width;
    this.height = height;
    this._init();
  }
  
  _toggle() {
    this._isAlive = !this._isAlive;
    this.element.classList.toggle( 'alive', this._isAlive );
  }

  get alive() {
    return this._isAlive;
  }

  set alive(state) {
    this._isAlive = !state;
    this._toggle();
  }

  _init() {
    const td = document.createElement('td');
    td.className = 'cell';
    td.width = this.width;
    td.height = this.height;
    this.element = td;

    td.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick() {
    this._toggle();
  }

}