import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import currentCard from './currentCard'
import user from './user'
import instructionsFromAdmin from './instructionsFromAdmin'
import currentCharacter from './currentCharacter'

const reducer = combineReducers({
  user,
  currentCard,
  instructionsFromAdmin,
  currentCharacter
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './currentCharacter'
export * from './currentCard'
