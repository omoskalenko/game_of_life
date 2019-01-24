/*global Grid */

class Game {
  constructor(gridWidth, gridHight, gridRows, gridCols, rootElement) {
    this.gridWidth = gridWidth;
    this.gridHight = gridHight;
    this.gridRows = gridRows;
    this.gridCols = gridCols;

    this.grid = new Grid(gridWidth, gridHight, gridRows, gridCols); //композиция
    this.isPlaying = false;
    this.speed = 1000;
    this.interval = null; 
    this.element = rootElement;
  }

}