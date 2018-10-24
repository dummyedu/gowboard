require('dotenv').config();
const program = require('commander');

const db = require('../server/mongo/base');
const { makeRandomBoard, collectBaseFeature } = require('../server/board');
const { addOrInsertBoard } = require('../server/mongo');
const { dumpArray } = require('./array');


program
  .version('1.0.0')
  .option('-c, --count <number>', 'the board count needed to be made')
  .option('-d, --dump', 'dump generated board')
  .parse(process.argv);

const count = program.count || 1;

const makeOneBoard = async () => {
  const board = makeRandomBoard();
  const feature = collectBaseFeature(board);
  await addOrInsertBoard(board, feature);
  return board;
};

const run = async () => {
  await db.up();
  for (let i = 0; i < count; i++) {
    const board = await makeOneBoard();
    if (program.dump) {
      dumpArray(0, board);
    }
  }
  process.exit(0);
};

run();
