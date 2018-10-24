const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  board: mongoose.Schema.Types.String,
  feature: mongoose.Schema.Types.Mixed,
});

/*
feature: {
  chain4: true,
  chain5: true,
  chainDepth: 0, // 0 means the first level to chain4
  doomSkull: 3,
  nextChain4: false,
  chain4Choice: 5,
  maxGems: 8, // max eliminated gems.
  process: false,
}
*/

// pagination & randomize.

BoardSchema.index({ 'board': 1 }, { unique: true });
BoardSchema.index({ 'feature.chain4': 1 }, { unique: false });
BoardSchema.index({ 'feature.chain5': 1 }, { unique: false });
BoardSchema.index({ 'feature.chainDepth': 1 }, { unique: false });
BoardSchema.index({ 'feature.doomSkull': 1 }, { unique: false });
BoardSchema.index({ 'feature.nextChain4': 1 }, { unique: false });
BoardSchema.index({ 'feature.chain4Choice': 1 }, { unique: false });
BoardSchema.index({ 'feature.maxGems': 1 }, { unique: false });

module.exports = {
  BoardSchema,
};
