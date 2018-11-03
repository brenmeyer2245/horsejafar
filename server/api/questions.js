const router = require('express').Router()
const {Question} = require('../db/models')
module.exports = router

//Finds unused questions
router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findRemainingQuestions()
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

//find question by id
router.get('/:questionId', async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId)
    res.json(question)
  } catch (err) {
    next(err)
  }
})

//mark question as used
router.put('/:questionId', async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId)
    await question.update({hasBeenUsed: true})
    res.json(question)
  } catch (err) {
    next(err)
  }
})
