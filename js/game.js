const GRID_WIDTH = 1280;
const GRID_HIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;
const GRID_SPEED = 1000;

const grid = createGrid( GRID_ROWS, GRID_COLS );
const nextGrid = createGrid( GRID_ROWS, GRID_COLS );

function createElement( tag, params ) {
  let element = document.createElement(tag);
  for (let param in params) {
    element[param] = params[param];
  }
  return element;
}
function carry( tagName, fn ) {
  return function(attr) {
    return fn(tagName, attr);
  };
}

let isPlaying = false;

function stopGame( button ) {
  isPlaying = false;
  button.textContent = 'play_arrow';
  
}
function play( button ) {
  isPlaying = true;
  button.textContent = 'pause';
  computeNextGrid();
  updateView();
}

const root = document.querySelector( '#root' );

function createGrid( rows, cols ) {
  const  grid = [];
  for (let i = 0; i < rows; i++) {
    const cell = [];
    for (let j = 0; j < cols; j++) {
      cell.push(0);
    }
    grid.push(cell);
  }
  return grid;
}
function createTable( rows, cols ) {
  const table = createElement( 'table', { className: 'grid' } );
  for ( let i = 0; i < rows; i++ ) {
    const row = document.createElement( 'tr' );
    row.className = 'row';
    for ( let j = 0; j < cols; j++ ) {
      const cell = document.createElement( 'td' );
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

const table = createTable( GRID_ROWS, GRID_COLS );
table.addEventListener('click', ({ target }) => {
  event.preventDefault();
  event.stopPropagation();
  if(target.tagName !== 'TD') return;
  target.classList.toggle('alive');
  updateGrid(target);
});

function createControl() {
  const startButton = createButton({
    className: 'material-icons',
    textContent: 'play_arrow'
  });
  startButton.addEventListener('click', function() {
    event.preventDefault();
    if ( isPlaying ) {
      stopGame(this);
    } else {
      play(this);
    }
  });

  const resetButton = createButton({
    className: 'material-icons',
    textContent: 'replay'
  });
  resetButton.addEventListener('click', function() {
    event.preventDefault();
    stopGame(startButton);
    resetGrid();
    updateView();
  });

  const randomizeButton = createButton({
    className: 'material-icons',
    textContent: 'transform'
  });
  randomizeButton.addEventListener('click', function() {
    event.preventDefault();
    stopGame(startButton);
    randomizeGrid();
    updateView();
  });

  const container = createElement('div', { className: 'controls' });

  container.append(startButton, resetButton, randomizeButton);

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
    y:rowIndex
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
      grid[i][j] =  Math.round(Math.random());
    }
  }
  return grid;
}
function resetGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] =  0;
    }
  }
  return grid;
}

function computeNextGrid() {
  //
}

