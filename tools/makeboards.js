const _ = require('lodash');
require('dotenv').config();
const program = require('commander');

const db = require('../server/mongo/base');
const { makeRandomBoard, collectBaseFeature, makePriorityTable } = require('../server/board');
const { addOrInsertBoard } = require('../server/mongo');
const { dumpArray } = require('./array');


program
  .version('1.0.0')
  .option('-c, --count <number>', 'the board count needed to be made')
  .option('-d, --dump', 'dump generated board')
  .option('-s, --skull <number>', 'skull count')
  .option('--step <number>', 'chain4 step possibility')
  .option('-b, --bias <number>', 'the priority is biased')
  .option('-r, --random', 'random the input')
  .parse(process.argv);

const time = new Date();

const count = program.count || 1;
const skullCount = program.skull == null ? 4 : program.skull;
const step = program.step == null ? -1 : parseInt(program.step);

console.log(skullCount, step);

let caseAdded = 0;
const addCase = () => {
  caseAdded++;
  if (caseAdded % 1000 === 0) {
    console.log(`${caseAdded} cases added, time spent ${(new Date() - time) / 1000}`);
  }
}

let priorityTable = null;

const randomInt = v => parseInt(Math.random() * v, 10);

if (program.bias) {
  let arr = [];
  for (let i = 0; i < 2; i++) {
    arr.push(13 * program.bias);
    arr.push(13);
    arr.push(13);
  }
  arr = _.shuffle(arr);
  arr.push(7);
  arr.push(0);
  arr.push(skullCount);
  priorityTable = makePriorityTable(arr);
} else if (program.random) {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(randomInt(30));
  }
  arr.push(7);
  arr.push(0);
  arr.push(randomInt(skullCount * 2));
  priorityTable = makePriorityTable(arr);
} else {
  priorityTable = makePriorityTable([13, 13, 13, 13, 13, 13, 7, 0, skullCount]);
}

const makeOneBoard = async () => {
  const board = makeRandomBoard(priorityTable);

  const feature = collectBaseFeature(board);
  if (step >= 0) {
    if (feature.chainMaxDepth < 8) {
      if (!feature.chain4) {
        return;
      }
      if (feature.chain4MinDepth < step) {
        return;
      }
    }
  }
  addCase();
  if (program.dump) {
    dumpArray(0, board);
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
  console.log(`${caseAdded} cases added`);
  process.exit(0);
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
