
const { queryRandomBoard } = require('../mongo');
const { QuestionType } = require('../../common');
const QuestionBuilder = require('./questionbuilder');
const { predictBoard } = require('../../gow');
const { getGemsInfoFromStep } = require('../board');

const getQuestion = async (type) => {
  if (type < 0 || type >= QuestionType.Count) {
    throw new Error(`${type} is unknown question type`);
  }
  const questionBuilder = QuestionBuilder(type);
  const condition = questionBuilder.getCondition();
  const data = (await queryRandomBoard(condition, 1))[0];
  const steps = predictBoard(data.board);
  steps.forEach(s => {
    s.gemsInfo = getGemsInfoFromStep(s);
  })
  data.questions = questionBuilder.build(data, steps);
  data.type = type;
  return data;
};

const getRandomQuestion = () => {
  const type = parseInt(Math.random() * QuestionType.Count, 10);
  return getQuestion(type);
};

module.exports = {
  getQuestion, getRandomQuestion,
};
