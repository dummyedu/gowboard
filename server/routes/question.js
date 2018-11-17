// to select right questions.

const Router = require('koa-router');
const questionImpl = require('../question');

const getQuestion = async (ctx) => {
  const type = ctx.params.type;
  const info = ctx.request.body;
  const question = await questionImpl.getQuestion(type, info);
  ctx.body = question;
};

const getRandomQuestion = async (ctx) => {
  const question = await questionImpl.getRandomQuestion();
  ctx.body = question;
};

const router = Router();

const routers = router
  .post('/random', getRandomQuestion)
  .post('/:type', getQuestion)

module.exports = routers;
