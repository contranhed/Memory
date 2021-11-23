import React from "react"
import "./Card.css"

const Card = ({ image, card, handleChoice, flip }) => {

  const handleClick = () => {
    handleChoice(card) // Function call to trigger the ternary operator condition and pass in the card the player chose.
  }

  return (
    <div className="Card">
      <div className={flip ? "flip" : ""}>
        {/* If there is an image, render the image */}
        {image && <img className="FrontCard" src={image} alt="" /> }
        <img
          className="BackCard"
          src="https://images.unsplash.com/photo-1560015534-cee980ba7e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          onClick={handleClick}
          alt="Back of a card"
        />
      </div>
    </div>
  )
}

export default Card;
