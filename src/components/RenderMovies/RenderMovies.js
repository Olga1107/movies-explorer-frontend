import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterShortMovies } from '../../utils/utils';

const RenderMovies = ({
  isLoader,
  movies ,
  savedMovies,
  isChecked,
  pinMovie,
  unpinMovie,
  countMovies = movies.length,
  mode,
  isFirst,
  setTextError,
  textError
}) => {

  const [renderMovies, setRenderMovies] = useState([]);

  const notFoundMovies = (
    <h2 className="movies__card-list-title">{textError}</h2>
  );

  useEffect(() => {
    setRenderMovies((filterShortMovies(movies || [], isChecked))
    .slice(0, countMovies)
    .map((movie) => {
      return (
        <MoviesCard
          movie={movie}
          savedMovies={savedMovies}
          pinMovie={pinMovie}
          unpinMovie={unpinMovie}
          key={movie.id || movie._id}
          mode={mode}
        />
      );
    }))
  }, [movies, isChecked, countMovies, mode, pinMovie, unpinMovie, savedMovies])
  
  useEffect(() => {
    if (isFirst === false) {
      setTextError(renderMovies.length === 0 ? 'Ничего не найдено' : '')
    }
  }, [isChecked, renderMovies, isFirst, setTextError])
    
  return (
    <>
      {!isLoader ? (
        renderMovies.length === 0 ? (
          notFoundMovies
        ) : (
          <ul className="movies__card-list">{renderMovies}</ul>
        )
      ) : (
        ''
      )}
    </>
  );
};

export default RenderMovies;
