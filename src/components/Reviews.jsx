import React from 'react';

const Reviews = ({ reviews }) => {
  if (!reviews?.results?.length) return null;

  return (
    <div>
      <h2>Reviews</h2>
      <div>
        {reviews.results.slice(0, 3).map(review => (
          <div key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;