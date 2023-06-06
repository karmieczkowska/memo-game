import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src" : "/assets/memo1.png", matched: false },
  { "src" : "/assets/memo2.png", matched: false },
  { "src" : "/assets/memo3.png", matched: false },
  { "src" : "/assets/memo4.png", matched: false },
  { "src" : "/assets/memo5.png", matched: false },
  { "src" : "/assets/memo6.png", matched: false },
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

// shuffle cards

const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]    // duplicate cards
    .sort(() => Math.random() - 0.5 )     // when it is negative number - items remain in the same order. when it is positive it's gona switch the order around
    .map((card) => ({ ...card, id: Math.random() }))      // returns objects with all card properties and we add new id property

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)     // it restars turn back to 0
  }

// handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}
// if choiceOne is null ten it means that we dont have selection for choiceOne.
// If it is false we run setChoiceOne(card).
// If it is not null it means we already have a selection for choiceOne and it will be true,
// we update choiceTwo, becuse we value for choiceOne


// compare two selcted cards
useEffect(() => {

  if (choiceOne && choiceTwo) {
  setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      setTimeout(() => resetTurn(), 1000)
    } else {

      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)

// reset choices and increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Memo game</h1>
      <button onClick={shuffleCards}>New Game</button>

    <div className="card-grid">
      {cards.map(card => (
        <SingleCard
        key={card.id}   // here we need key proprty, because we are in map function and we add card prop to send it to componet
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disable={disabled}
        />
      ))}
    </div>
    <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
