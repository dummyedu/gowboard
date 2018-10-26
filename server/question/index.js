
const { queryRandomBoard } = require('../mongo');
const { QuestionType } = require('../../common');

const getQuestion = async (type) => {
  if (type < 0 || type >= QuestionType.Count) {
    throw new Error(`${type} is unknown question type`);
  }
  const q = (await queryRandomBoard(null, 1))[0];
  q.type = type;
  return q;
};

const getRandomQuestion = () => {
  const type = parseInt(Math.random() * QuestionType.Count, 10);
  return getQuestion(type);
};

module.exports = {
  getQuestion, getRandomQuestion,
};
