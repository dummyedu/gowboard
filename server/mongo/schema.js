const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  board: mongoose.Schema.Types.String,
  feature: mongoose.Schema.Types.Mixed,
});

/*
feature: {
    chain4: false,
    chain5: false,
    chain4MinDepth: 0, // 0 means the first level to chain4
    chain4MaxDepth: 0, // 
    doomSkull: 0,
    chain4Choice: 0,
    maxGems: 0, // max eliminated gems.
    maxMana: 0, // max mana gems.
    process: true,
}
*/

// pagination & randomize.

BoardSchema.index({ 'board': 1 }, { unique: true });
BoardSchema.index({ 'feature.chain4': 1 }, { unique: false });
BoardSchema.index({ 'feature.chain5': 1 }, { unique: false });
BoardSchema.index({ 'feature.chain4MinDepth': 1 }, { unique: false });
BoardSchema.index({ 'feature.chain4MaxDepth': 1 }, { unique: false });
BoardSchema.index({ 'feature.doomSkull': 1 }, { unique: false });
BoardSchema.index({ 'feature.chain4Choice': 1 }, { unique: false });
BoardSchema.index({ 'feature.maxGems': 1 }, { unique: false });
BoardSchema.index({ 'feature.maxMana': 1 }, { unique: false });
BoardSchema.index({ 'feature.process': 1 }, { unique: false });


module.exports = {
  BoardSchema,
};
