const router = require('express').Router()
const {Card} = require('../db/models')
module.exports = router

//Finds unused cards
router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.findRemainingCards()
    res.json(cards)
  } catch (err) {
    next(err)
  }
})

//find card by id
router.get('/:cardId', async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId)
    res.json(card)
  } catch (err) {
    next(err)
  }
})

//mark card as used
router.put('/:cardId', async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId)
    await card.update({hasBeenUsed: true})
    res.json(card)
  } catch (err) {
    next(err)
  }
})
