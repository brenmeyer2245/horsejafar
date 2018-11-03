const router = require('express').Router()
const {Round} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json('Round return')
  } catch (err) {
    next(err)
  }
})
