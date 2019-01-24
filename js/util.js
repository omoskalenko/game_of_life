
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

const createButton = carry('button', createElement);