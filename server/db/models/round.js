const Sequelize = require('sequelize')
const db = require('../db')

const Round = db.define('round', {
  playerTurnCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  holdInput: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  answerQueue: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

module.exports = Round
