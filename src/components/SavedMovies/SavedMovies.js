import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import RenderMovies from '../RenderMovies/RenderMovies';
import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/utils';

const SavedMovies = ({ movies, isLoader, unpinMovie, onInputSearchError }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);

    const handleSearchSubmit = (name) => {
        setFoundMovies(filterMovies(movies, name));
    };

    useEffect(() => {
        setFoundMovies(movies);
    }, [movies]);

    return (
        <main className="movies movies_type_saved">
            {' '}
            <SearchForm
                onSubmit={handleSearchSubmit}
                isChecked={isChecked}
                onInputSearchError={onInputSearchError}
                handleInputChecked={() => setIsChecked(!isChecked)}
            />
            {isLoader ? <Preloader /> : ''}
            <MoviesCardList>
                <RenderMovies
                    movies={foundMovies}
                    isLoader={isLoader}
                    isChecked={isChecked}
                    unpinMovie={unpinMovie}
                    mode="liked"
                />
            </MoviesCardList>
        </main>
    );
};

export default SavedMovies;
