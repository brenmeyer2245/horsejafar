const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  cardType: Sequelize.STRING,
  description: Sequelize.STRING,
  picture: Sequelize.STRING,
  pointValue: {
    type: Sequelize.INTEGER
  },
  effectValue: {
    type: Sequelize.STRING
  },
  itemValue: {
    type: Sequelize.STRING
  },
  hasBeenUsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Card.findRemainingCards = function() {
  return Card.findAll({
    where: {
      hasBeenUsed: false
    }
  })
}

module.exports = Card
