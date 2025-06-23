import React from 'react'
import StarRating from '../Home/StarRating'
import profilePng from '../../images/Profile.png'

const ReviewCard = ({review}) => {
  return (
    <div className='reviewCard'>
        <img  src={profilePng} alt="User"/>
        <p>{review.name}</p>
        <StarRating 
            value={review.rating}  
            size={window.innerWidth < 600 ? 20 : 25}
            count={5}
        />
        <span className='reviewCardComment'>{review.comment }</span>
      
    </div>
  )
}

export default ReviewCard;
