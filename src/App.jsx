import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import './app.scss'
import SingleCard from './components/SingleCard'

const cardImages = [
  { src: '/img/helmet-1.png', matched: false }, 
  { src: '/img/potion-1.png', matched: false }, 
  { src: '/img/ring-1.png', matched: false }, 
  { src: '/img/scroll-1.png', matched: false }, 
  { src: '/img/shield-1.png', matched: false }, 
  { src: '/img/sword-1.png', matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Shuffle Cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuid() }))
    setCards(shuffleCards)
    setTurns(0)
  }

  const handleChoice = (cardInfo) => {
    choiceOne ? setChoiceTwo(cardInfo) : setChoiceOne(cardInfo)
  }

  useEffect(() => {
    shuffleCards()  
  }, [])
 
  // Compare Two Selected  Cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prev => {
          return prev.map(card => {
            if(card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  return (
    <div className='container'>
      <h1 className='head-title'>Magic Match</h1>
      <button onClick={shuffleCards} className='btn'>
        New Game
      </button>
      <p className="turn">Turns: {turns}</p>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
          />
        ))}
      </div>
      
    </div>
  )
}

export default App
