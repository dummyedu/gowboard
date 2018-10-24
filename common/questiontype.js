
const Enum = [
  'Chain4Count',
  'Chain5Found',
  'Chain4Found',
  'MostGemsMatch',
  'MostSpecificGemsMatch',
  'NextChain4Found',
  'MostManaCollected',

  'Count',
]

const Types = {};
Enum.forEach((name, i) => {
  Types[name] = i;
});

module.exports = Types;
