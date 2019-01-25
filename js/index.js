import Game from './game/game.js';
import View from './game/game.view.js';
import GridView from './grid/grid.view.js';
import Controller from './controller.js';

/* global GridView */

const GRID_WIDTH = 1280;
const GRID_HEIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;

const root = document.getElementById('root');

const game = new Game(GRID_ROWS, GRID_COLS);
const gridView = new GridView(GRID_WIDTH, GRID_HEIGHT, GRID_ROWS, GRID_COLS);
const view = new View(gridView, root);
const controller = new Controller(game, view);

