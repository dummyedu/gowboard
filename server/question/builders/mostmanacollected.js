const _ = require('lodash');

const getCondition = () => {
  return null;
};

const build = (boardData, steps) => {
  steps.sort((a, b) => b.gemsInfo.manaCount - a.score.manaCount);
  steps[0].maxMana = true;
  
  const l = [];
  for (let i = 0; i < steps.length && i < 4; i++) {
    l.push(steps[i]);
  }
  const options = _.shuffle(l);

  let answer = 0;
  for (let i = 0; i < options.length; i++) {
    if (options[i].maxMana) {
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
