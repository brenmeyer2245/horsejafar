const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  pointValue: {
    type: Sequelize.INTEGER
  },
  prompt: {
    type: Sequelize.STRING
  },
  answer: {
    type: Sequelize.STRING
  },
  hasBeenUsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Question.findRemainingQuestions = function() {
  return Question.findAll({
    where: {
      hasBeenUsed: false
    }
  })
}

module.exports = Question
