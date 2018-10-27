const _ = require('lodash');

const getCondition = () => {
  return null;
};

const build = (boardData, steps) => {
  steps.sort((a, b) => b.gemsInfo.gemsCount - a.score.gemsCount);
  steps[0].maxGems = true;
  
  const l = [];
  for (let i = 0; i < steps.length && i < 4; i++) {
    l.push(steps[i]);
  }
  const options = _.shuffle(l);

  let answer = 0;
  for (let i = 0; i < options.length; i++) {
    if (options[i].maxGems) {
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
