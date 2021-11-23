import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import './MemoryBoard.css'

const MemoryBoard = () => {
  const [deck, setDeck] = useState([]) 
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  
  /**
   * 
   * Ensure a fetch of only one deck of cards from the API through the empty array.
   */
  useEffect(() => {
    fetchData('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  }, [])


  /**
   * 
   * @function fetchData grab hold of five unique cards and store them in a variable.
   * @param {*} url to the deck of cards API
   */
  const fetchData = async (url) => {
    try {
      const res = await fetch(url) // Fetch the deck of card and store it in a variable when the promise has been resolved.
      const data = await res.json() // Translate the data to JSON and store in a new variable.   
      const cardRes = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`) // Fetch five cars and store them in a variable when the promise has been resolved.
      const newData = await cardRes.json() // Translate the data to JSON and store in new variable.
      const cards = newData.cards // Grab hold of the individual card objects and store them in a variable that holds and array
      const cardsCopy = [...cards] // Create a copy of the elements in the cards array
      const miniDeck = cards.concat(cardsCopy) // Combine the two in a new object that is an array.
      shuffleCards(miniDeck) // Function call that passes in the deck of five cards.
    } catch(e) { // Error handling
      console.log('Could not retrieve a deck of cards')
      console.log(e)
    }
  }

  const handleChoice = (choice) => {
    firstCard ? setSecondCard(choice) : setFirstCard(choice) // ternary operator to check the player's choice of card.
  }

  useEffect(() => { // Fires everytime a dependency changes.
    if (firstCard && secondCard) { // Check if the first and second cards are the same
      if(firstCard.value === secondCard.value) { // Check if the value of the card is the same.
        console.log('there is a match')
        setDeck((prev) => { // Set a new array of cards
          return prev.map(card => { // Return a new array
            if (card.value === firstCard.value) { // Check if there is a match of cards.
              return { ...card, match: true} // If there is a match, return a new object and set the match property to true
            } else { // If not, return the card without change.
              return card
            }
          })
        })
        resetCards() // Function call to reset the states of the first and second card.
      } else {
        console.log('that was not a match')
        setTimeout(() => resetCards(), 1000) // Delay the turn of card to 1 second.
      }
    }
  }, [firstCard, secondCard]) // When a card is selected it will fire the function in this useEffect

  console.log(deck)

  /**
   * 
   * @function resetCards reset the states of the first and second cards
   */
  const resetCards = () => {
    setFirstCard(null)
    setSecondCard(null)
  }

  /**
   * 
   * @function shuffleCards Combines two of the same array objects into one array, shuffles the order of cards and provides each a unique number. 
   * @param {*} cards array object with five cards.
   */
  const shuffleCards = (cards) => {
    const shuffledCards = [...cards] // Spread operator to access all the elements in the array
    .sort(() => Math.random() -0.5) // Shuffle the cards in this array.
    .map((cards) => ({...cards, id: Math.random(), match: false})) // Give each card a unique id.
    setDeck(shuffledCards) // Set the deck in the random order and with unique id:s.
  }
  console.log(deck)

  return (
    <div className="MemoryBoard-container">
      {/* Loop through the array that holds the deck with ten cards */}
      {deck.map((card) => (
        // Create a card with the use of a Card component.
        <Card 
          key={card.id} // Pass in the unique id for the card.
          image={card.image} // Pass in the card object image.
          handleChoice={handleChoice} // Pass in the function with the chosen card.
          card={card} // Pass in the card object
          flip={card === firstCard || card === secondCard || card.match} // The image of the card should be faced up when the player chooses first and second card PLUS keep already matched cards faced up.
        />
      ))}
      
    </div>
  )
}

export default MemoryBoard
