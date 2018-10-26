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
  if (program.dump) {
    dumpArray(0, board);
  }
  const feature = collectBaseFeature(board);
  if (program.dump) {
    console.log(feature);
  }
  const insertBoard = await addOrInsertBoard(board, feature);
  if (program.dump) {
    console.log(insertBoard);
  }
};

const run = async () => {
  await db.up();
  for (let i = 0; i < count; i++) {
    await makeOneBoard();
  }
  process.exit(0);
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
