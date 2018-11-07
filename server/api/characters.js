const router = require('express').Router()
const {Character} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //Check if USER is an admin
    console.log('Get All Characters')
    const characters = await Character.findAll()
    res.json(characters)
  } catch (err) {
    next(err)
  }
})

router.get('/:characterId', async (req, res, next) => {
  try {
    console.log('Get Character By Id')
    const characterById = await Character.findById(req.params.characterId)
    res.json(characterById)
  } catch (err) {
    next(err)
  }
})

router.put('/:characterId', async (req, res, next) => {
  try {
    //Check if USER is an admin
    const {cardType, itemValue, pointValue, effectValue} = req.body
    console.log('\n\nUpdate Character')
    //find character
    const characterToUpdate = await Character.findById(req.params.characterId)

    //parse out the input
    const newCharacterInfo = {...characterToUpdate}

    if (cardType === 'POINTS')
      newCharacterInfo.pointValue += req.body.pointValue
    else if (cardType === 'EFFECT')
      newCharacterInfo.effectValue = req.body.effectValue
    else if (cardType === 'ITEM')
      newCharacterInfo.itemValue.push(req.body.itemValue)
    else throw new Error("Card doesn't match a type")
    await characterToUpdate.update(newCharacterInfo)

    res.json(characterToUpdate)
  } catch (err) {
    next(err)
  }
})

router.put('/:characterId/points', async (req, res, next) => {
  try {
    const {actionType, pointValue} = req.body
    const characterToUpdate = await Character.findById(req.params.characterId)
    let calcPoints
    if (actionType === 'ADD') {
      calcPoints = req.body.pointValue + characterToUpdate.points
    } else if (actionType === 'REMOVE') {
      calcPoints = characterToUpdate.points - req.body.pointValue
    } else if (actionType === 'TO_ZERO') {
      calcPoints = 0
    }
    await characterToUpdate.update({points: calcPoints})
    res.json(characterToUpdate)
  } catch (err) {
    next(err)
  }
})

router.put('/:characterId/effects', async (req, res, next) => {
  try {
    const {actionType} = req.body
    const characterToUpdate = await Character.findById(req.params.characterId)
    let effectvalue
    if (actionType === 'CLEAR') effectvalue = null
    else if (actionType === 'ADD') effectvalue = req.body.effectValue
    await characterToUpdate.update({effects: effectvalue})
    res.json(characterToUpdate)
  } catch (err) {
    next(err)
  }
})
router.put('/:characterId/items', async (req, res, next) => {
  try {
    const {actionType, itemValue} = req.body
    const characterToUpdate = await Character.findById(req.params.characterId)
    let updatedInventory = [...characterToUpdate.inventory]

    console.log('\n\nBody', req.body)
    console.log('currentInventory', updatedInventory, '\n\n')

    if (actionType === 'SPEND') {
      //remove an item of the requested type
      //throw error if not there
      const itemId = updatedInventory.indexOf(itemValue)
      updatedInventory.splice(itemId, 1)
    } else if (actionType === 'LOSEALL') {
      //set the character's inventory to empty
      updatedInventory = []
    } else if (actionType === 'ADD') {
      //add new item value to the user's inventory
      updatedInventory.push(itemValue)
    }
    await characterToUpdate.update({inventory: updatedInventory})
    res.json(characterToUpdate)
  } catch (err) {
    next(err)
  }
})
