const Router = require('koa-router');
const question = require('./question');
const collect = require('./collect');
const answer = require('./answer');
const viewer = require('./viewer');

const router = Router();

router.use('/question', question.routes(), question.allowedMethods());
router.use('/collect', collect.routes(), collect.allowedMethods());
router.use('/answer', answer.routes(), answer.allowedMethods());
router.use('/viewer', viewer.routes(), viewer.allowedMethods());

// router.get('/', async (ctx) => {
//   ctx.body = "Server is ready";
// });

module.exports = router;
