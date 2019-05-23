
const Router = require('koa-router');
const { isValidBoard, calcSwapBoard2 } = require('../../gow');

const calc = (ctx) => {
  const data = ctx.request.body;
  if (!isValidBoard(data.board)) {
    throw new Error("Invalid board");
  }
  ctx.body = calcSwapBoard2(data.board, data.group, data.skills)
}

const router = Router();

const routers = router
  .post('/calc', calc)

module.exports = routers;
