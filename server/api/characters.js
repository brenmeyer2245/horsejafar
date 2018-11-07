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

    console.log('\n\nUpdate Character')
    //find character
    const characterToUpdate = await Character.findById(req.params.characterId)

    //parse out the input
    const newCharacterInfo = {...characterToUpdate}

    if (req.body.pointValue) newCharacterInfo.pointValue = req.body.pointValue
    if (req.body.effectValue)
      newCharacterInfo.effectValue = req.body.effectValue
    if (req.body.itemValue) newCharacterInfo.itemValue = req.body.itemValue

    await characterToUpdate.update(newCharacterInfo)

    res.json(characterToUpdate)
  } catch (err) {
    next(err)
  }
})
