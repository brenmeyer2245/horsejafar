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

  //TODO, make a one to many relationship with user or character
})

//TODO: make a check that a Card can only have one value between point, effect and item

Card.findRemainingCards = function() {
  return Card.findAll({
    where: {
      hasBeenUsed: false
    }
  })
}

module.exports = Card
