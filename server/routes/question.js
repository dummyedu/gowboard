// to select right questions.

const Router = require('koa-router');
const questionImpl = require('../question');

const getQuestion = (ctx) => {
  const type = ctx.params.type;
  // const data = ctx.request.body;
  const question = questionImpl.getQuestion(type);
  ctx.body = question;
};

const getRandomQuestion = (ctx) => {
  const question = questionImpl.getRandomQuestion();
  ctx.body = question;
};

const router = Router();

const routers = router
  .get('/random', getRandomQuestion)
  .get('/:type', getQuestion)

module.exports = routers;
