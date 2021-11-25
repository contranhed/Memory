import './Card.css'
import CardBack from '../../images/CardBack.jpg'

const Card = ({ image, card, handleChoice, flip }) => {

  /**
   * 
   * @function handleClick Pays attention to a click event and then pass in the card object the player chose (needed to update the state in MemoryBoard component).
   */
  const handleClick = () => {
    handleChoice(card) 
  }

  return (
    <div className="Card">
      {/* Condition to check the value of flip. If any of the conditions are true (set in MemoryBoard component), then the card will have the flip class. Else this condition will pass in an empty string as a class for the card */}
      <div className={flip ? "flip" : ""}> 
        {/* Condition to check if there is an image. If so, render the image through the help of css */}
        {image && <img className="FrontCard" src={image} alt="Card front" /> } 
        <img
          className="BackCard"
          src={CardBack}
          onClick={handleClick} // Function that, based on a click event, passes in which card the player chose.
          alt="Back of a card"
        />
      </div>
    </div>
  )
}

export default Card
