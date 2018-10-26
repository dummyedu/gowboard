// to select right questions.

const Router = require('koa-router');
const { collectBaseFeature } = require('../board');
const { isValidBoard } = require('../../gow');
const { addOrInsertBoard, queryRandomBoard } = require('../mongo');

const addBoard = async (ctx) => {
  const data = ctx.request.body;
  if (!isValidBoard(data.board)) {
    throw new Error("Invalid board");
  }
  const info = collectBaseFeature(data.board);
  await addOrInsertBoard(data.board, info);
  ctx.body = info;
};

const getRandomBoard = async (ctx) => {
  const boards = await queryRandomBoard(null, 1);
  const { board, feature } = boards[0];
  ctx.body = {
    board, feature
  };
};

const router = Router();

const routers = router
  .post('/addboard', addBoard)
  .get('/getRandomBoard', getRandomBoard)

module.exports = routers;
