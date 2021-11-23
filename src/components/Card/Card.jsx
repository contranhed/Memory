import React from 'react'
import './Card.css'

const Card = ({ image = null }) => {
  return (
    <div >
      {/* If there is an image, render the image */}
      { image && <img className="Card" src={image} alt='' /> } 
    </div>
  )
}

export default Card

