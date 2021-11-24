import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import './MemoryBoard.css'

const MemoryBoard = () => {
  const [deck, setDeck] = useState([]) 
  const [firstCard, setFirstCard] = useState(null) // Will store reference to the first chosen card.
  const [secondCard, setSecondCard] = useState(null) // Will store reference to the second chosen card.
  
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
   * @param {*} url to the deck of cards API.
   */
  const fetchData = async (url) => {
    try {
      const res = await fetch(url) // Fetch the deck of card and store it in a variable when the promise has been resolved.
      const data = await res.json() // Translate the data to JSON and store in a new variable.   
      const cardRes = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`) // Fetch five cars and store them in a variable when the promise has been resolved.
      const newData = await cardRes.json() // Translate the data to JSON and store in new variable.
      const cards = newData.cards // Grab hold of the individual card objects and store them in a variable that holds and array
      const cardsCopy = [...cards] // Create a copy of the elements in the cards array
      const miniDeck = cards.concat(cardsCopy) // Combine the two into a new array object.
      shuffleCards(miniDeck) // Function call that passes in the deck of ten cards.
    } catch(e) { // Error handling
      console.log('Could not retrieve a deck of cards')
      console.log(e)
    }
  }

  /**
   * 
   * @function handleChoice checks the player's choice of cards.
   * @param {*} choice the card the player chose
   */  
  const handleChoice = (choice) => { 
    console.log(choice)
    // Check: Is the firstCard null? If not, update the state for secondCard. If yes, update the state for firstCard.
    firstCard ? setSecondCard(choice) : setFirstCard(choice) 
  }

  useEffect(() => { // Fires everytime a dependency changes through handleChoice function, i.e. firstCard and secondCard.
    if (firstCard && secondCard) { // Check if the firstCard and secondCard have values.
      if(firstCard.value === secondCard.value) { // Check if the value of the cards are the same.
        console.log('there is a match')
        setDeck((prev) => { // Update the state of the deck through the passing of the previous state.
          return prev.map(card => { // Return a new array.
            if (card.value === firstCard.value) { // Check if there is a match of cards in the mapped array and the chosen firstCard.
              return { ...card, match: true} // If there is a match, return a new object and set the match property to true
            } else { // If not, return the card without updating any state.
              return card
            }
          })
        })
        resetCards() // Function call to reset the states of the first and second card.
      } else {
        console.log('that was not a match')
        setTimeout(() => resetCards(), 1000) // Delay the turn of cards by 1 second.
      }
    }
  }, [firstCard, secondCard]) //The states that might change and this function needs access of.

  /**
   * 
   * @function resetCards reset the states of firstCard and secondCard by passing in the value of null and no longer has the prop flip.
   */
  const resetCards = () => {
    setFirstCard(null)
    setSecondCard(null)
  }

  /**
   * 
   * @function shuffleCards Shuffles the order of cards in the array that was passed in as an argument and provides each card with a random id. 
   * @param {*} cards array object with ten cards.
   */
  const shuffleCards = (cards) => {
    const shuffledCards = [...cards] // Spread operator to access all the elements in the array
    .sort(() => Math.random() -0.5) // Shuffle the cards in this array.
    .map((cards, i) => ({...cards, id: i, match: false})) // Give each card a random id number. NB! Have not used Math floor to make it even more unlikely of a match of ids, though there, as of now, is a slight chance of such happening.
    setDeck(shuffledCards) // Set the deck in the random order and with the id:s.
  }

  return (
    <div className="MemoryBoard-container">
      {/* Loop through the array that holds the deck with ten cards */}
      {deck.length === 10 ? deck.map((card) => ( // Conditional to check if the deck contains ten cards. If so, map though the array of cards.
        <Card  // Create a card with the use of a Card component.
          key={card.id} // Pass in the unique id for the card.
          image={card.image} // Pass in the card object image.
          handleChoice={handleChoice} // Pass in a function that manages the logic with chosen cards.
          card={card} // Pass in the card object
          // The card shall face up if the iterated card equals the firstCard, the secondCard or if the match property of tje card object is set to true .
          flip={card === firstCard || card === secondCard || card.match} 
        />
        // Conditional: Display loading until cards are rendered.
      )) : <p>Loading...</p>} 
    </div>
  )
}

export default MemoryBoard
