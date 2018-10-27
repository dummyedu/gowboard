
const getCondition = () => {
    return {
      'feature.chain4': true,
      'feature.chain4MinDepth': { $gt: 0 },
      'feature.chain4Choice': { $gt: 1 },
    };
};

const build = (boardData, steps) => {
  const chain4Choice = boardData.feature.chain4Choice;
  const start = parseInt(Math.random() * chain4Choice, 10);
  const options = [start, start + 1, start + 2, start + 3];

  let answer = 0;
  for (let i = 0; i < options.length; i++) {
    if (options[i] === chain4Choice) {
      answer = i;
    }
  }
  const hint = {
    chain4Steps: steps.filter(s => s.fourOrFiveChain),
  }
  return {
    options,
    answer,
    hint,
  }
};

module.exports = {
  getCondition,
  build,
};
