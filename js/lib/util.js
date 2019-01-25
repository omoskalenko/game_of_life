function createElement(tag, props, ...children) {
  const element = document.createElement(tag);
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.substring(2), value);
      } else if (key.startsWith('data-')) {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });
  }
  if(children) {
    for (let child of children) {
      element.append(child);
    }
  }
  return element;
}

function carry(tagName, fn) {
  return function (attr) {
    return fn(tagName, attr);
  };
}

const createButton = carry('button', createElement);

export { createButton, createElement };