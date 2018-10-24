const { up } = require('./base');

const { 
  addOrInsertBoard,
  updateBoard,
  queryBoard
} = require('./board');

module.exports = {
  up,
  addOrInsertBoard,
  updateBoard,
  queryBoard,
};
