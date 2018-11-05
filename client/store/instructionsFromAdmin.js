// Action Types
const Actions = {
  DRAW_CARD_PROMPT: 'DRAW_CARD_PROMPT',
  FORM_TRIVIA_PROMPT: 'FORM_TRIVIA_PROMPT',
  BUTTON_TRIVIA_PROMPT: 'BUTTON_TRIVIA_PROMPT',
  DEACTIVATE_ALL: 'DEACTIVATE_ALL'
}

// Action Creators
export const activateDrawCard = () => ({
  type: Actions.DRAW_CARD_PROMPT
})

export const deactivateAllCards = () => ({
  type: Actions.DEACTIVATE_ALL
})

export const activateFormTriva = () => ({
  type: Actions.FORM_TRIVIA_PROMPT
})

export const activateButtonTriva = () => ({
  type: Actions.BUTTON_TRIVIA_PROMPT
})

const initState = {
  promptedToDrawCard: false,
  promptedToFormTrivia: false,
  promptedToButtonTriva: false
}

//Reducer
const instructionsFromAdminReducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.DRAW_CARD_PROMPT:
      return {
        promptedToDrawCard: true,
        promptedToFormTrivia: false,
        promptedToButtonTriva: false
      }
    case Actions.FORM_TRIVIA_PROMPT:
      return {
        promptedToDrawCard: false,
        promptedToFormTrivia: true,
        promptedToButtonTriva: false
      }
    case Actions.BUTTON_TRIVIA_PROMPT:
      return {
        promptedToDrawCard: false,
        promptedToFormTrivia: false,
        promptedToButtonTriva: true
      }
    case Actions.DEACTIVATE_ALL:
      return initState
    default:
      return state
  }
}

export default instructionsFromAdminReducer
