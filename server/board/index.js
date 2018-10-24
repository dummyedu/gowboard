const {
  makeRandomBoard, dumpArray,
} = require('../../gow');

const collectBaseFeature = (board) => {
  return {
    process: false,
  };
};

module.exports = {
  makeRandomBoard,
  collectBaseFeature,
  dumpArray,
}
