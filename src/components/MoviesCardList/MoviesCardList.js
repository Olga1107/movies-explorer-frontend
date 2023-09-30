import React from 'react';
import './MoviesCardList.css';

const MoviesCardList = ({ children }) => (
  <section className="movies__card-list-section">{children}</section>
);

export default MoviesCardList;
