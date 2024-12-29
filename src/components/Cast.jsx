import React from 'react';

const Cast = ({ cast }) => {
  if (!cast?.length) return null;

  return (
    <div>
      <h2>Cast</h2>
      <div>
        {cast.slice(0, 5).map(actor => (
          <div key={actor.id}>
            <p>{actor.name} as {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;