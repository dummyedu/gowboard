
const { QuestionType } = require('../../common');

const QuestionBuilder = [];

QuestionBuilder[QuestionType.Chain4Count] = require('./builders/chain4count');
QuestionBuilder[QuestionType.Chain5Found] = require('./builders/notimplemented');
QuestionBuilder[QuestionType.Chain4Found] = require('./builders/chain4found');
QuestionBuilder[QuestionType.MostGemsMatch] = require('./builders/mostgemsmatch');
QuestionBuilder[QuestionType.MostSpecificGemsMatch] = require('./builders/notimplemented');
QuestionBuilder[QuestionType.NextChain4Found] = require('./builders/notimplemented');
QuestionBuilder[QuestionType.MostManaCollected] = require('./builders/notimplemented');

module.exports = type => QuestionBuilder[type];
