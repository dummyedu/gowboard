
const mongoose = require('mongoose');
const { BoardSchema, StatsQuestionSchema } = require('./schema');

const dbName = process.env.DB_NAME;
const gowAddress = `${process.env.MONGO_DB}/${dbName}`;

console.log(gowAddress)

const assureRootDB = () => {
  return mongoose.createConnection(gowAddress, {
    useNewUrlParser: true
  }).then(db => {
    const Board = db.model(dbName, BoardSchema);
    Board.createIndexes();
    const StatsQuestion = db.model("stats", StatsQuestionSchema);
    StatsQuestion.createIndexes();
    return { db, Board, StatsQuestion };
  });
}

let dbInfo;
let connecting = false;

const up = () => {
  if (connecting) {
    return;
  }
  mongoose.set('useFindAndModify', false);
  connecting = true;
  return assureRootDB()
    .then((info) => {
      dbInfo = info;
      connecting = false;
      return dbInfo;
    })
    .catch(e => {
      connecting = false;
      throw (e);
    })
}

const getDB = () => dbInfo && dbInfo.db;
const getBoard = () => dbInfo && dbInfo.Board;
const getStatsQuestion = () => dbInfo && dbInfo.StatsQuestion;

module.exports = { up, getDB, getBoard, getStatsQuestion };
