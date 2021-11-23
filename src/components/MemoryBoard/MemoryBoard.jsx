import React from 'react'
import { useState, useEffect } from 'react'
import Card from '../Card/Card'
import './MemoryBoard.css'

const MemoryBoard = () => {
  const [deck, setDeck] = useState([])
  
  // Ensure a fetch of only one deck of cards from the API through the empty array.
  useEffect(() => {
    fetchData('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  }, [])

  const fetchData = async (url) => {
    try {
      const res = await fetch(url) // Fetch the deck of card and store it in a variable when the promise has been resolved.
      const data = await res.json() // Translate the data to JSON and store in a new variable.
      console.log(data)
      
      const cardRes = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`) // Fetch five cars and store them in a variable when the promise has been resolved.
      const newData = await cardRes.json() // Translate the data to JSON and store in new variable.
      const cards = newData.cards // Grab hold of the individual card objects and store them in a variable that holds and array
      const cardsCopy = [...cards] // Create a copy of the elements in the cards array
      const miniDeck = cards.concat(cardsCopy) // Combine the two in a new object that is an array.
      const result = miniDeck.sort(() => Math.random() -0.5) // Shuffle the order of the elements in the array 
      setDeck(result) // set the final deck of 10 cards in the array accessible through the useState.
      console.log(result)
    } catch(e) { // Error handling
      console.log('Could not retrieve a deck of cards')
      console.log(e)
    }
  }
 
  return (
    <div className="MemoryBoard-container">
      {/* Loop through the array that holds the deck with ten cards */}
      {deck.map((item) => (
        // Create a card with the use of a Card component.
        <Card 
          key={item.id}
          image={item.image}
        />
      ))}
      
    </div>
  )
}

export default MemoryBoard
