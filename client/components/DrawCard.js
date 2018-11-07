import React from 'react'
import {drawNewCard, wipeCardToNull, applyCardToCharacter} from '../store'
import {connect} from 'react-redux'

const DrawCard = props => (
  <div className="card" style={{width: '18rem'}}>
    {props.currentCard.id ? (
      <img className="card-img-top" src=".../100px180/" alt="Card image cap" />
    ) : (
      <div style={{backgroundColor: '#999'}} />
    )}
    <div className="card-body">
      <h5 className="card-title">
        {props.currentCard.cardType || ' Draw A Card'}
      </h5>
      {props.currentCard.description ? (
        <div>
          <p className="card-text">{props.currentCard.description}</p>
          <button
            type="button"
            onClick={() =>
              props.wipeCard(props.currentCharacter.id, props.currentCard)
            }
          >
            Apply
          </button>
        </div>
      ) : (
        <button type="button" onClick={props.drawACard}>
          Draw
        </button>
      )}
    </div>
  </div>
)

const mapState = state => ({
  currentCard: state.currentCard,
  currentCharacter: state.currentCharacter
})
const mapDispatch = dispatch => ({
  drawACard: () => {
    console.log('Draw at Component')
    dispatch(drawNewCard())
  },
  wipeCard: (characterId, info) => {
    console.log('Apply', info)
    dispatch(applyCardToCharacter(characterId, info))
    console.log('Wipe')
    dispatch(wipeCardToNull())
  }
})

export default connect(mapState, mapDispatch)(DrawCard)
