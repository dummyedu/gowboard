const fs = require('fs')
const Router = require('koa-router');
const rimraf = require("rimraf");
const execa = require('execa')
const { isValidBoard, calcSwapBoard2 } = require('../../gow');

const calc = (ctx) => {
  const data = ctx.request.body;
  if (!isValidBoard(data.board)) {
    throw new Error("Invalid board");
  }
  ctx.body = calcSwapBoard2(data.board, data.group, data.skills)
}

const detect = async (ctx) => {
  console.log(ctx.request.files.file.path)

  child_process = execa.shell('python python/detect.py ' + ctx.request.files.file.path + " output.json", {
  });
  try {
    await child_process
    const text = fs.readFileSync('output.json')
    rimraf.sync('output.json')
  
    ctx.body = text
  } catch (e) {
    ctx.body = "error"
  }
}

const router = Router();

const routers = router
  .post('/calc', calc)
  .post('/detect', detect)

module.exports = routers;
