import axios from 'axios'

// Action Types
const Actions = {
  NEW_CARD: 'NEW_CURRENT_CARD',
  WIPE_CARD: 'WIPE_CARD',
  UPDATE_CARD: 'UPDATE_CARD'
}

// Action Creators
const setNewCard = card => ({
  type: Actions.NEW_CARD,
  card
})
const wipeCard = () => ({
  type: Actions.WIPE_CARD
})

const updateCard = card => ({
  type: Actions.UPDATE_CARD,
  card
})

// Thunks
export const drawNewCard = () => async dispatch => {
  const {data: newCard} = await axios.get('/api/cards/new')
  console.log('Data', newCard)
  dispatch(setNewCard(newCard))
}

export const wipeCardToNull = () => dispatch => {
  dispatch(wipeCard())
}

const initState = {
  id: null,
  cardType: null,
  actionType: null,
  description: null,
  picture: null,
  pointValue: 0,
  effectValue: null,
  itemValue: null,
  hasBeenUsed: false
}
//Reducer
const currentCardReducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.NEW_CARD:
      return action.card
    case Actions.WIPE_CARD:
      return initState
    default:
      return state
  }
}

export default currentCardReducer
