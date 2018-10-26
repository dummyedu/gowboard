
const mongoose = require('mongoose');
const { BoardSchema } = require('./schema');

const dbName = process.env.DB_NAME;
const gowAddress = `${process.env.MONGO_DB}/${dbName}`;

const assureRootDB = () => {
  return mongoose.createConnection(gowAddress, {
    useNewUrlParser: true
  }).then(db => {
    const Board = db.model(dbName, BoardSchema);
    Board.createIndexes();
    return { db, Board };
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

module.exports = { up, getDB, getBoard };
