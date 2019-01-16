const GRID_WIDTH = 1280;
const GRID_HIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;
const GAME_SPEED = 100;

const grid = createGrid(GRID_ROWS, GRID_COLS);
const nextGrid = createGrid(GRID_ROWS, GRID_COLS);

function createElement(tag, params) {
  let element = document.createElement(tag);
  for (let param in params) {
    element[param] = params[param];
  }
  return element;
}

function carry(tagName, fn) {
  return function (attr) {
    return fn(tagName, attr);
  };
}

let isPlaying = false;
let interval = null;

function stopGame(button) {
  isPlaying = false;
  button.textContent = 'play_arrow';
  clearInterval(interval);
}

function play() {
  computeNextGrid();
  updateView();
}

const root = document.querySelector('#root');

function createGrid(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const cell = [];
    for (let j = 0; j < cols; j++) {
      cell.push(0);
    }
    grid.push(cell);
  }
  return grid;
}

function createTable(rows, cols) {
  const table = createElement('table', {
    className: 'grid'
  });
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    row.className = 'row';
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('td');
      cell.className = 'cell';
      cell.width = GRID_WIDTH / cols;
      cell.height = GRID_HIGHT / rows;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  root.appendChild(table);
  return table;
}
const createButton = carry('button', createElement);

const table = createTable(GRID_ROWS, GRID_COLS);
table.addEventListener('click', ({ target }) => {
  event.preventDefault();
  event.stopPropagation();
  if (target.tagName !== 'TD') return;
  target.classList.toggle('alive');
  updateGrid(target);
});

function createControl() {
  const startButton = createButton({
    className: 'material-icons',
    textContent: 'play_arrow'
  });
  startButton.addEventListener('click', function () {
    event.preventDefault();
    if (isPlaying) {
      stopGame(this);
    } else {
      isPlaying = true;
      this.textContent = 'pause';
      interval = setInterval( play, GAME_SPEED );
    }
  });

  const resetButton = createButton({
    className: 'material-icons',
    textContent: 'replay'
  });
  resetButton.addEventListener('click', function () {
    event.preventDefault();
    stopGame(startButton);
    resetGrid();
    updateView();
  });

  const randomizeButton = createButton({
    className: 'material-icons',
    textContent: 'transform'
  });
  randomizeButton.addEventListener('click', function () {
    event.preventDefault();
    stopGame(startButton);
    randomizeGrid();
    updateView();
  });

  const speedSlider = createElement('input', {
    type: 'range',
    min: 0,
    max: 900,
    step: 50
  });
  speedSlider.addEventListener('change', ({ target }) => {
    clearInterval(interval);
    interval = setInterval(play, target.value); 
  });

  const container = createElement('div', {
    className: 'controls'
  });

  container.append(startButton, resetButton, randomizeButton, speedSlider);

  return container;
}

root.appendChild(createControl());

function updateGrid(cell, rows, cols) {
  const colIndex = cell.cellIndex;
  const rowIndex = cell.parentNode.rowIndex;

  grid[rowIndex][colIndex] = cell.classList.contains('alive') ? 1 : 0;

  return {
    statusCell: grid[rowIndex][colIndex],
    x: colIndex,
    y: rowIndex
  };
}

function updateView(cell, rows, cols) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = table.rows[i].cells[j];
      const isCellAlive = grid[i][j];
      cell.classList.toggle('alive', isCellAlive);
    }
  }
  return true;
}

function randomizeGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = Math.round(Math.random());
    }
  }
  return grid;
}

function resetGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

function computeNextGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      applayRules(i, j);
    }
  }
  copyNextGrid();
}

function applayRules(row, col) {
  const isAlive = grid[row][col];
  const numberOfNeigbors = countNeighbors(row, col);

  if (isAlive) {
    if (numberOfNeigbors < 2) {
      // Cell dies
      nextGrid[row][col] = 0;
    } else if (numberOfNeigbors === 2 || numberOfNeigbors === 3) {
      // Cell lives
      nextGrid[row][col] = 1;
    } else if (numberOfNeigbors > 3) {
      // Cell dies
      nextGrid[row][col] = 0;
    }
  } else {
    if (numberOfNeigbors === 3) {
      // Cell lives
      nextGrid[row][col] = 1;
    }
  }
}

function countNeighbors(row, col) {
  let count = 0;

  if (row - 1 >= 0) { // top
    if (grid[row - 1][col] === 1) count++;
  }

  if (row - 1 >= 0 && col - 1 >= 0) { // top left
    if (grid[row - 1][col - 1] == 1) count++;
  }

  if (row - 1 >= 0 && col + 1 < GRID_COLS) { // top right
    if (grid[row - 1][col + 1] == 1) count++;
  }

  if (col - 1 >= 0) { // left
    if (grid[row][col - 1] == 1) count++;
  }

  if (col + 1 < GRID_COLS) { // right
    if (grid[row][col + 1] == 1) count++;
  }

  if (row + 1 < GRID_ROWS) { // bottom
    if (grid[row + 1][col] == 1) count++;
  }

  if (row + 1 < GRID_ROWS && col - 1 >= 0) { // bottom left
    if (grid[row + 1][col - 1] == 1) count++;
  }

  if (row + 1 < GRID_ROWS && col + 1 < GRID_COLS) { // bottom right
    if (grid[row + 1][col + 1] == 1) count++;
  }

  return count;
}

function copyNextGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = nextGrid[i][j];
      nextGrid[i][j] = 0;
    }
  }
}
