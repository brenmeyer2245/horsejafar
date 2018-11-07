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

router.get('/new', async (req, res, next) => {
  try {
    const cards = await Card.findRemainingCards()

    if (cards.length <= 0) throw new Error('No more cards to draw')
    //draw a random card between 0 and cards.length
    const cardId = Math.floor(Math.random() * cards.length)
    console.log('\nCards at index', cards[cardId].id)

    const drawnCard = await Card.findById(cards[cardId].id)
    // await drawnCard.update({hasBeenUsed: true})
    res.json(drawnCard)
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
