/* global Game */


const GRID_WIDTH = 1280;
const GRID_HIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;

const root = document.getElementById('root');

new Game(GRID_WIDTH, GRID_HIGHT, GRID_ROWS, GRID_COLS, root);