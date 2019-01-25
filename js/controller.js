export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;

    this.game.onCellStateChange = cell => view.updateCell(cell);
    
    this.view.onGridClick = (row, col) => game.toggleCellState(row, col);
    this.view.init();
  }
}