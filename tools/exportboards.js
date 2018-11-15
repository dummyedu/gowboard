const _ = require('lodash');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const program = require('commander');

const db = require('../server/mongo/base');
const { queryBoard } = require('../server/mongo');
const { getQuestionCondition } = require('../server/question');
const { QuestionType } = require('../common');

const { prepareImages, createCanvas } = require('./prepareimage');
const { renderToCanvasGenerator } = require('./render');

program
  .version('1.0.0')
  .option('-c, --count <number>', 'the board count needed to be exported')
  .option('-d, --difficulty <number>', 'difficulty')
  .option('-o, --output <string>', 'output directory')
  .parse(process.argv);

const boardSize = 400;

const renderBoardInto = (canvas, renderer, board, output) => {
  renderer(canvas, board, boardSize / 8);
  const buf2 = canvas.toBuffer('image/png', { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE });
  const filename = path.join(output, `${JSON.stringify(board)}.png`);
  fs.writeFileSync(filename, buf2);
}

const exportBoards = async (count, difficulty, output) => {
  // query first.
  difficulty = parseInt(difficulty, 10);
  const condition = await getQuestionCondition(QuestionType.Chain4Found, difficulty);
  console.log(condition);
  const boards = await queryBoard(condition, parseInt(count, 10), 0);
  const canvas = createCanvas(boardSize, boardSize);
  const images = await prepareImages();
  const renderer = renderToCanvasGenerator(images.backGroundImage, images.gameImages);
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i].board;
    renderBoardInto(canvas, renderer, board, output);
  }
};

  const run = async () => {
    await db.up();
    await exportBoards(program.count, program.difficulty, program.output);
    process.exit(0);
  };
  
  run()
    .catch((e) => {
      console.log(e);
      process.exit(1);
    })
