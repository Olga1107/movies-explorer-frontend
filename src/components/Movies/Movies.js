import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import RenderMovies from '../RenderMovies/RenderMovies';
import useMoviesDisplay from '../../utils/hooks/useMoviesDisplay';
import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/utils';

const Movies = ({ movies, savedMovies, pinMovie, unpinMovie, isLoader, onInputSearchError }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [initialName, setInitialName] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const { countMovies, isButtonMoreEnabled, handleButtonMore } = useMoviesDisplay({
        movies,
        isChecked,
        initialName,
    });

    const initialCheckbox = () => {
        return (localStorage.getItem('checkbox') || '') === 'true';
    };
    const initialNameValue = () => {
        return localStorage.getItem('name') || '';
    };

    const handleSearchSubmit = (name, isChecked) => {
        localStorage.setItem('name', name);
        setInitialName(name);
        setIsChecked(isChecked);
    };

    useEffect(() => {
        setIsChecked(initialCheckbox());
        setInitialName(initialNameValue());
    }, []);

    useEffect(() => {
        setFoundMovies(filterMovies(movies, initialName));
    }, [movies, initialName]);

    return (
        <main className="movies">
            <SearchForm
                onSubmit={handleSearchSubmit}
                onInputSearchError={onInputSearchError}
                isChecked={isChecked}
                initialName={initialNameValue}
                handleInputChecked={setIsChecked}
            />
            {isLoader ? <Preloader /> : ''}
            <MoviesCardList>
                <RenderMovies
                    movies={foundMovies}
                    isLoader={isLoader}
                    isChecked={isChecked}
                    countMovies={countMovies}
                    savedMovies={savedMovies}
                    pinMovie={pinMovie}
                    unpinMovie={unpinMovie}
                />
            </MoviesCardList>
            {isButtonMoreEnabled ? <ButtonMore onClick={handleButtonMore} /> : ''}
        </main>
    );
};

export default Movies;