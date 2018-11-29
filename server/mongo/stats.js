const _ = require('lodash');
const { getStatsQuestion } = require('../mongo/base');

const addQuestionStat = async (type, info, ip) => {
  info.board;
  info.difficulty;
  return getStatsQuestion().insertMany([{
    type,
    difficulty: info.difficulty,
    date: new Date(),
    ip,
    shared: info.board,
  }]);
};

module.exports = {
  addQuestionStat,
};
