// to select right questions.

const Router = require('koa-router');
const questionImpl = require('../question');
const { QuestionType } = require('../../common');

const getBestAnswer = async (ctx) => {
  const info = ctx.request.body;
  const question = await questionImpl.getQuestion(QuestionType.Chain4Found, {
    board: info.board,
  });
  ctx.body = question.questions.options[question.questions.answer];
};

const router = Router();

const routers = router
  .post('/best', getBestAnswer)

module.exports = routers;
