import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import RenderMovies from '../RenderMovies/RenderMovies';
import useMoviesDisplay from '../../utils/hooks/useMoviesDisplay';
import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/utils';

const Movies = ({ movies, savedMovies, pinMovie, unpinMovie, isLoader, onInputSearchError, getMovies }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [initialName, setInitialName] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [isFirst, setIsFirst] = useState(true);
    const [textError, setTextError] = useState('')
    const { countMovies, isButtonMoreEnabled, handleButtonMore, setDefaultButtonMore } = useMoviesDisplay({
        movies: (isFirst ? JSON.parse(localStorage.getItem('movies')) : movies),
        isChecked,
        initialName,
    });

    const initialCheckbox = () => {
        return (localStorage.getItem('checkbox') === 'true');
    };
    const initialNameValue = () => {
        return localStorage.getItem('name') || '';
    };

    const handleSearchSubmit = (name, isChecked) => {
        localStorage.setItem('name', name);
        setDefaultButtonMore();
        setInitialName(name);
        setIsChecked(isChecked);
    };

    useEffect(() => {
        setIsChecked(initialCheckbox());
        setInitialName(initialNameValue());
    }, []);

    useEffect(() => {
        const films = filterMovies(movies, initialName);      

        if (isFirst === false) {
            setTextError(films.length === 0 ? 'Ничего не найдено' : '')
            localStorage.setItem('movies', JSON.stringify(films));
        }
        setFoundMovies(films);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies, initialName, isFirst]);

    return (
        <main className="movies">
            <SearchForm
                onSubmit={handleSearchSubmit}
                onInputSearchError={onInputSearchError}
                isChecked={isChecked}
                initialName={initialNameValue}
                handleInputChecked={setIsChecked}
                getMovies={getMovies}
                movies={movies}
                setIsFirst={setIsFirst}
            />
            {isLoader ? <Preloader /> : ''}
            <MoviesCardList>
                <RenderMovies
                    textError={textError}
                    movies={isFirst ? JSON.parse(localStorage.getItem('movies')) : foundMovies}
                    isLoader={isLoader}
                    isChecked={isChecked}
                    countMovies={countMovies}
                    savedMovies={savedMovies}
                    pinMovie={pinMovie}
                    unpinMovie={unpinMovie}
                    isFirst={isFirst}
                    setTextError={setTextError}
                />
            </MoviesCardList>
            {isButtonMoreEnabled ? <ButtonMore onClick={handleButtonMore} /> : ''}
        </main>
    );
};

export default Movies;