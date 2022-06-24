import React from 'react'

function FeedbackStats({ feedback }) {
    // Calculate rating avg

    let average = feedback.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.rating
    }, 0) / feedback.length

    // Removing decimale place if average is a zero
    average = average.toFixed(1).replace(/[.,]0$/, '')


  return (
      <div className='feedback-stats'>
          <h4>{feedback.length} Reviews</h4>
          <h4>Average Rating: { isNaN(average) ? 0: average }</h4>
    </div>
  )
}

export default FeedbackStats