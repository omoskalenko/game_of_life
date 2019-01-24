/*global Grid */

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
  }

}