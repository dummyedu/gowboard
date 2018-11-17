const fromX = (x) => {
  return String.fromCharCode('A'.charCodeAt(0) + x);
};
const fromY = (y) => {
  return String.fromCharCode('8'.charCodeAt(0) - y);
};
const swapString = (op) => {
  return `${fromX(op.x1)}${fromY(op.y1)} - ${fromX(op.x2)}${fromY(op.y2)}`
}

export {
  swapString
}
