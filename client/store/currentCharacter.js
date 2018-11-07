import axios from 'axios'

// Action Types
const Actions = {
  NEW_CHARACTER: 'NEW_CHARACTER',
  UPDATE_CHARACTER: 'UPDATE_CHARACTER'
}

// Action Creators
const fetchedCharacterToAction = character => ({
  type: Actions.NEW_CHARACTER,
  character
})

const updatedCharacterToAction = character => ({
  type: Actions.UPDATE_CHARACTER,
  character
})

// Thunks
export const getCharacterFromServer = id => async dispatch => {
  const {data: fetchedCharacter} = await axios.get(`/api/characters/${id}`)
  console.log('Data', fetchedCharacter)
  dispatch(fetchedCharacterToAction(fetchedCharacter))
}

export const updateCharacterOnServer = (
  id,
  newCharacterInfo
) => async dispatch => {
  const {data: updatedCharacter} = await axios.put(
    `/api/characters/${id}`,
    newCharacterInfo
  )
  console.log('Updated Data', updatedCharacter)
  dispatch(updatedCharacterToAction(updatedCharacter))
}

const initState = {
  id: null,
  name: null,
  points: 0,
  effects: null,
  inventory: []
}
//Reducer
const characterReducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.NEW_CHARACTER:
      return action.character
    case Actions.UPDATE_CHARACTER:
      return action.character
    default:
      return state
  }
}

export default characterReducer
