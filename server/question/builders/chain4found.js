const _ = require('lodash');

const getCondition = ({ difficulty }) => {
  const d = (difficulty == null) ? parseInt(Math.random() * 4, 10) : difficulty;
  return {
    'feature.chain4': true,
    'feature.chain4MinDepth': d,
    'feature.chain4Choice': 1,
  };
};

const build = (boardData, steps) => {
  const l = [];
  for (let i = 0; i < steps.length && i < 4; i++) {
    l.push(steps[i]);
  }
  const options = _.shuffle(l);

  let answer = 0;
  for (let i = 0; i < options.length; i++) {
    if (options[i].fourOrFiveChain) {
      answer = i;
    }
  }
  return {
    options,
    answer,
  }
};

module.exports = {
  getCondition,
  build,
};
