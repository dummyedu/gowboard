const Router = require('koa-router');
const question = require('./question');

const router = Router();

router.use('/question', question.routes(), question.allowedMethods());

router.get('/', async (ctx) => {
  ctx.body = "Server is ready";
});

module.exports = router;
