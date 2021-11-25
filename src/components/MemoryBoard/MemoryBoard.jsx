import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import './MemoryBoard.css'

const MemoryBoard = () => {
  const [deck, setDeck] = useState([]) // The state will store a deck of cards. Empty array is the initial state.
  const [firstCard, setFirstCard] = useState(null) // The state will store the first chosen card. Null is the initial state.
  const [secondCard, setSecondCard] = useState(null) // The state will store the second chosen card. Null is the initial state..

  /**
   *
   * Ensure a fetch of only one deck of cards from the API through the passing of an empty array.
   */
  useEffect(() => {
    fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1") // Function call that passes in the URL to the deck of cards API.
  }, [])

  /**
   *
   * @function fetchData Grab hold of five unique cards and store them in a variable.
   * @param {*} url to the deck of cards API.
   */
  const fetchData = async (url) => {
    try {
      const res = await fetch(url) // Fetch the deck of card and store it in a variable when the promise has been resolved.
      const data = await res.json() // Translate the data to JSON and store in a new variable when the promise has been resolved.
      const cardRes = await fetch(
        `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`
      ) // Fetch five cars and store them in a variable when the promise has been resolved.
      const newData = await cardRes.json() // Translate the data to JSON and store in new variable.
      const cards = newData.cards // Grab hold of the individual card objects and store them in a variable that holds an array.
      const cardsCopy = [...cards] // Create a copy of the elements in the cards array.
      const miniDeck = cards.concat(cardsCopy) // Combine the two into a new array object.
      shuffleCards(miniDeck) // Function call that passes in the deck of ten cards.
    } catch (e) {  // Error handling
      console.log("Could not retrieve a deck of cards")
      console.log(e)
    }
  }

  /**
   *
   * @function handleChoice checks the player's choice of cards.
   * @param {*} choice the card the player chose/clicked on.
   */
  const handleChoice = (choice) => {
    // Check: Is the firstCard null? If not, update the state for secondCard. If yes, update the state for firstCard.
    firstCard ? setSecondCard(choice) : setFirstCard(choice)
  }

  useEffect(() => { // Fires everytime a dependency changes through handleChoice function, i.e. when the states are updated in firstCard and secondCard.
    if (firstCard && secondCard) { // Check if it is true that the firstCard and secondCard have values, i.e. are not null.
      if (firstCard.value === secondCard.value && firstCard.suit === secondCard.suit) {
          setDeck((prev) => {   // Update the state of the deck through the passing of the previous state.
          return prev.map((card) => {  // Return a new array...
            if (card.value === firstCard.value && card.suit === firstCard.suit) { // ... and check for the value and the suit of the firstCard that are the same as the item iterated in the array.
              return { ...card, match: true } // When found, return a new object and set the card's match property to true.
            } else {
              return card // If it is not the right card, return the card without updating any state.
            }
          })
        })
        resetCards() // Function call to reset the states of the firstCard and secondCard.
      } else {
        setTimeout(() => resetCards(), 1000) // Delay the turn of cards by 1 second.
      }
    }
  }, [firstCard, secondCard]) //The states this hook needs access to in order to update the states.

  /**
   *
   * @function resetCards reset the states of firstCard and secondCard by passing in the value of null.
   */
  const resetCards = () => {
    setFirstCard(null)
    setSecondCard(null)
  }

  /**
   *
   * @function shuffleCards Shuffles the order of cards in the array that was passed in as an argument and provides each card with two new properties.
   * @param {*} cards array that contains card objects.
   */
  const shuffleCards = (cards) => {
    const shuffledCards = [...cards] // Spread operator to access all the elements/card objects in the array and store them in a variable.
      .sort(() => Math.random() - 0.5) // Shuffle the cards in this array.
      .map((cards, i) => ({ ...cards, id: i, match: false })) // Give each card two additional properties: a random id number and a boolean to enable matched cards to face up.
    setDeck(shuffledCards) // Set the deck that now has cards in random order, each of which has two new properties.
  }

  return (
    <div className="MemoryBoard-container">
      {/* Loop through the array that holds the deck with ten cards */}
      {deck.length === 10 ? ( // Conditional to check if the deck contains ten cards. If so, map though the array of cards.
        deck.map((card) => ( 
            <Card // Create a card with the use of a Card component.
              key={card.id} // Pass in the id for the card to enable rendering and avoid complaints from the browser.
              image={card.image} // Pass in the card image and make it accessible in the Card component.
              handleChoice={handleChoice} // Pass in a function that help manage the logic with chosen cards and make the function accessible in the Card component.
              card={card} // Pass in the card object and make it accessible in the Card component.
              // The card shall face up if the iterated card equals the card stored in firstCard (same for the secondCard) or if the match property of the card object is set to true.
              flip={card === firstCard || card === secondCard || card.match} // Pass in flip as ab argument and make it accessible in the Card component. It manages three conditions that regard the turn of cards.
            />
          )
        )
      ) : (
        <p className="Loading">Loading...</p>  // Conditional: Display loading until all ten cards are fetched and set in the deck.
      )}
    </div>
  )
}

export default MemoryBoard
