const fromX = (x) => {
  return String.fromCharCode('A'.charCodeAt(0) + x);
};
const fromY = (y) => {
  return String.fromCharCode('8'.charCodeAt(0) - y);
};
const swapString = (op) => {
  return `${fromX(op.x1)}${fromY(op.y1)} - ${fromX(op.x2)}${fromY(op.y2)}`
}

const parseQueryString = (str) => {
  const objURL = {};
  str.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    ($0, $1, $2, $3) => {
      objURL[$1] = $3;
    }
  );
  return objURL;
}

export {
  swapString, fromX, fromY, parseQueryString,
}
