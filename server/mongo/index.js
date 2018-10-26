const { up } = require('./base');

const { 
  addOrInsertBoard,
  updateBoard,
  queryRandomBoard,
  queryBoard
} = require('./board');

module.exports = {
  up,
  addOrInsertBoard,
  updateBoard,
  queryBoard,
  queryRandomBoard,
};
