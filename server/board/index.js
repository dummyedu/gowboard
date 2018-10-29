const _ = require('lodash');

const {
  makeRandomBoard, dumpArray,
  predictBoard, makePriorityTable,
} = require('../../gow');

const getGemCount = (board, type) => {
  let ret = 0;
  board.forEach(c => {
    if (c === type) ret++;
  });
  return ret;
}

const getGemsInfoFromStep = (step) => {
  let gemsCount = 0;
  let manaCount = 0;
  let depth = 0;
  let finalDepth = -1;
  let manas = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let gems = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < step.details.length; i++) {
    const d = step.details[i];
    let chainFour = 0;
    if (d.collected) {
      d.collected.forEach((e, i) => {
        if (e == null) {
          return;
        }
        e.el.forEach(type => {
          if (i === 20) {
            if (type === 8) {
              manas[6] += 3;
            } else {
              manas[type] += 0.5;
            }
          }
          gems[type]++;
        });
        if (i !== 20) {
          if (e.count >= 4) {
            chainFour++;
          }
          const t = e.type === 8 ? 6 : e.type;
          if (e.count === 3) {
            manas[t] += 5;
          } else if (e.count === 4) {
            manas[t] += 4;
          } else {
            manas[t] += e.count * 2;
          }
        }
      });
      if (finalDepth === -1 && chainFour > 0) {
        finalDepth = depth;
      }
      depth++;
    }
  }
  gemsCount = _.sum(gems);
  manaCount = _.sum(manas);
  return {
    chain4Depth: finalDepth,
    depth,
    gemsCount,
    manaCount,
    manas,
    gems,
  };
}

const collectBaseFeature = (board) => {
  const steps = predictBoard(board);
  const feature = {
    chain4: false,
    chain5: false,
    doomSkull: 0,
    chain4Choice: 0,
    chain4MinDepth: 0, // 0 means the first level to chain4
    chain4MaxDepth: 0, // 
    maxGems: 0, // max eliminated gems.
    maxMana: 0, // max mana gems.
    process: true,
  }
  feature.doomSkull = getGemCount(board, 8);
  feature.maxGems = 0;
  feature.chain4MinDepth = 10;
  feature.chain4MaxDepth = -10;
  feature.maxStep2Swaps = 0;
  feature.maxStep3Swaps = 0;
  feature.matchCountBeforeChain = 0;
  steps.forEach(step => {
    const info = getGemsInfoFromStep(step);
    step._info = info;
    if (step.fiveChain) {
      feature.chain5 = true;
    }
    if (step.fourOrFiveChain) {
      feature.chain4 = true;
      feature.chain4Choice++;
      feature.chain4MinDepth = Math.min(feature.chain4MinDepth, info.chain4Depth);
      feature.chain4MaxDepth = Math.max(feature.chain4MaxDepth, info.chain4Depth);
    }
    feature.maxGems = Math.max(feature.maxGems, info.gemsCount);
    feature.maxMana = Math.max(feature.maxMana, info.manaCount);
    if (info.depth >= 3) {
      feature.maxStep3Swaps++;
    }
    if (info.depth >= 2) {
      feature.maxStep2Swaps++;
    }
  });

  feature.maxSwaps = steps.length;
  let maxGemsCount = 0;
  let maxManaCount = 0;
  steps.forEach(step => {
    if (step._info.gemsCount === feature.maxGems) {
      maxGemsCount++;
    }
    if (step._info.manaCount === feature.maxMana) {
      maxManaCount++;
    }
  });
  feature.maxGemsPossible = maxGemsCount === 1;
  feature.maxManaPossible = maxManaCount === 1;
  return feature;
};

module.exports = {
  makeRandomBoard,
  collectBaseFeature,
  getGemsInfoFromStep,
  dumpArray,
  makePriorityTable,
}
