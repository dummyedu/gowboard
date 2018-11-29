const { up } = require('./base');

const { 
  addOrInsertBoard,
  updateBoard,
  queryRandomBoard,
  queryBoard
} = require('./board');

const {
  addQuestionStat,
} = require('./stats');

module.exports = {
  up,
  addOrInsertBoard,
  updateBoard,
  queryBoard,
  queryRandomBoard,

  addQuestionStat,
};
