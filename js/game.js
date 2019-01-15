const GRID_WIDTH = 1280;
const GRID_HIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;
const GRID_SPEED = 1000;

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

const root = document.querySelector( '#root' );

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

const table = createTable( GRID_ROWS, GRID_COLS );
table.addEventListener('click', ({ target }) => {
  event.preventDefault();
  event.stopPropagation();
  if(target.tagName !== 'TD') return;
  target.classList.toggle('alive');
});

const createButton = carry('button', createElement);

function createControl() {
  const startButton = createButton({
    className: 'material-icons',
    textContent: 'play_arrow'
  });
  startButton.addEventListener('click', function() {
    event.preventDefault();
    if ( isPlaying ) {
      isPlaying = false;
      this.textContent = 'play_arrow';
    } else {
      isPlaying = true;
      this.textContent = 'pause';
    }
  });
  const resetButton = createButton({
    className: 'material-icons',
    textContent: 'replay'
  });
  resetButton.addEventListener('click', function() {
    event.preventDefault();
    if ( isPlaying ) {
      isPlaying = false;
      this.textContent = 'pause';
    } else {
      isPlaying = true;
      this.textContent = 'play_arrow';
    }
  });
  const randomizeButton = createButton({
    className: 'material-icons',
    textContent: 'transform'
  });
  randomizeButton.addEventListener('click', function() {
    event.preventDefault();
    if ( isPlaying ) {
      isPlaying = false;
      this.textContent = 'pause';
    } else {
      isPlaying = true;
      this.textContent = 'play_arrow';
    }
  });
  const container = createElement('div', {
    className: 'controls'
  });
  container.append(startButton, resetButton, randomizeButton);
  return container;
}

root.appendChild(createControl());
