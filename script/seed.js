'use strict'

const db = require('../server/db')
const {User, Card, Question, Round, Character} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  const cards = await Promise.all([
    Card.create({
      cardType: 'POINTS',
      description: 'Points Card',
      pointValue: 5
    }),
    Card.create({
      cardType: 'EFFECT',
      description: 'Effect Card',
      effectValue: 'One'
    }),
    Card.create({
      cardType: 'ITEM',
      description: 'Item Card',
      effectValue: 'Motor'
    })
  ])

  const questions = await Promise.all([
    Question.create({
      pointValue: 1,
      prompt: 'What?',
      answer: 'This'
    }),
    Question.create({
      pointValue: 2,
      prompt: 'Who?',
      answer: 'Him'
    }),
    Question.create({
      pointValue: 3,
      prompt: 'When?',
      answer: 'Now'
    })
  ])

  const character = await Character.create({
    name: 'TestCharacter'
  })
  const round = await Round.create()
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${cards.length} cards`)
  console.log(`seeded ${questions.length} questions`)
  console.log(`seeded ${round.length} round`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
