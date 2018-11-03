import React from 'react'
import axios from 'axios'
const log = () => {
  console.log('Hello World')
}

const DrawCard = props => (
  <div className="card" style={{width: '18rem'}}>
    {props.drawn ? (
      <img className="card-img-top" src=".../100px180/" alt="Card image cap" />
    ) : (
      <div style={{backgroundColor: '#999'}} />
    )}
    <div className="card-body">
      <h5 className="card-title">{props.title || ' Draw A Card'}</h5>
      {props.description ? (
        <p className="card-text">{props.description}</p>
      ) : (
        <button onClick={log}>Draw</button>
      )}
    </div>
  </div>
)

export default DrawCard
