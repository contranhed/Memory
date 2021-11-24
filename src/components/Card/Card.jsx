import React from "react"
import "./Card.css"


const Card = ({ image, card, handleChoice, flip }) => {

  /**
   * 
   * @function handleClick Listen to a click event and pass in the card (value) the player chose to update the state. Game logic managed in MemoryBoard.
   */
  const handleClick = () => {
    handleChoice(card) 
  }

  return (
    <div className="Card">
      {/* Conditional to check the value of flip. if it is flip, then it will have the flip class. Else pass in an empty string as a class */}
      <div className={flip ? "flip" : ""}> 
        {/* Conditional to check if there is an image. If so, render the image */}
        {image && <img className="FrontCard" src={image} alt="Card front" /> } 
        {/* The back card that handles the flipping of card, check of value with an onClick function */}
        <img
          className="BackCard"
          src="https://images.unsplash.com/photo-1560015534-cee980ba7e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          // src="../../../public/images/CardBack.jpg"
          onClick={handleClick} // Function call to pass in which card the player chose, that will be further managed in MemoryBoard component.
          alt="Back of a card"
        />
      </div>
    </div>
  )
}

export default Card;
