const _ = require('lodash');
const { getBoard } = require('../mongo/base');

const addOrInsertBoard = (board, feature) => {
  const boardStr = JSON.stringify(board);
  return getBoard().findOneAndUpdate(
    {board: boardStr},
    {
      board: boardStr,
      feature,
    },
    {upsert: true, new: true}
  ).exec();
};

const updateBoard = (board, feature) => {
  const boardStr = JSON.stringify(board);
  return getBoard().findOneAndUpdate(
    {board: boardStr},
    {
      board,
      feature,
    },
    {upsert: false, new: true}
  ).exec();
};

const queryBoard = async (condition, count = 1, start = 0) => {
  const boards = await getBoard().find(condition)
    .skip(start)
    .limit(count)
    .exec();
  return boards.map(b => {
    const v = b.getValue([]);
    return {
      board: JSON.parse(v.board),
      feature: v.feature,
    };
  })
};

const queryBoardCount = async (condition) => {
  const count = await getBoard().find(condition)
    .count()
    .exec();
  return count;
}

const queryRandomBoard = async (condition, count) => {
  let start = 0;
  const totalCount = await getBoard().countDocuments(condition).exec();
  if (totalCount > count) {
    start = parseInt(Math.random() * (totalCount - count), 10);
  }
  return queryBoard(condition, count, start);
}

module.exports = {
  addOrInsertBoard,
  updateBoard,
  queryBoard,
  queryRandomBoard,
  queryBoardCount,
};
