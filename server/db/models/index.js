const User = require('./user')
const Card = require('./card')
const Question = require('./question')
const Round = require('./round')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
// Round.hasOne(Question)
// Question.belongsTo(Round)

module.exports = {
  User,
  Card,
  Question,
  Round
}
