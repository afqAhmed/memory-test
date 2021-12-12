import './singleCard.scss'

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if(!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src}></img>
        <img className='back' src='img/cover.png' onClick={handleClick}></img>
      </div>
    </div>
  )
}

export default SingleCard
