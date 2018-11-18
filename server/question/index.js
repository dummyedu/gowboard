
const { queryRandomBoard, queryBoard } = require('../mongo');
const { QuestionType } = require('../../common');
const QuestionBuilder = require('./questionbuilder');
const { predictBoard } = require('../../gow');
const { getGemsInfoFromStep } = require('../board');

const getQuestion = async (type, params) => {
  if (type < 0 || type >= QuestionType.Count) {
    throw new Error(`${type} is unknown question type`);
  }
  const questionBuilder = QuestionBuilder(type);
  const condition = params.board ? 
    {
      board: JSON.stringify(params.board)
    } : questionBuilder.getCondition(params);
  const queryMethod = params.board ? queryBoard : queryRandomBoard;
  const data = (await queryMethod(condition, 1))[0];
  const steps = predictBoard(data.board);
  steps.forEach(s => {
    s.gemsInfo = getGemsInfoFromStep(s);
  })
  data.questions = questionBuilder.build(data, steps);
  data.type = type;
  return data;
};

const getRandomQuestion = (params) => {
  const type = parseInt(Math.random() * QuestionType.Count, 10);
  return getQuestion(type, params);
};

const getQuestionCondition = (type, difficulty) => {
  if (type < 0 || type >= QuestionType.Count) {
    throw new Error(`${type} is unknown question type`);
  }
  const questionBuilder = QuestionBuilder(type);
  const condition = questionBuilder.getCondition({ difficulty });
  return condition;
}

module.exports = {
  getQuestion, getRandomQuestion, getQuestionCondition,
};
