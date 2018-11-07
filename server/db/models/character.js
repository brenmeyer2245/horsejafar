const Sequelize = require('sequelize')
const db = require('../db')

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  effects: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  inventory: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

module.exports = Character
