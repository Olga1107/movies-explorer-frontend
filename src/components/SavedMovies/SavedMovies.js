import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import RenderMovies from '../RenderMovies/RenderMovies';
import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/utils';
import useMoviesDisplay from '../../utils/hooks/useMoviesDisplay';
import ButtonMore from '../ButtonMore/ButtonMore';


const SavedMovies = ({ movies, isLoader, unpinMovie, onInputSearchError }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [isFirst, setIsFirst] = useState(true);
    const [textError, setTextError] = useState('Вы ещё ничего не добавили')
    const { countMovies, isButtonMoreEnabled, handleButtonMore } = useMoviesDisplay({
        movies: foundMovies,
        isChecked,
        initialName: '',
    });


    const handleSearchSubmit = (name, isChecked) => {
        setFoundMovies(filterMovies(movies, name));      
        setIsChecked(isChecked);
    };


    useEffect(() => {
        if (isFirst === false) {
            setTextError(foundMovies.length === 0 ? 'Ничего не найдено' : '')
        }
    }, [foundMovies, isFirst, isChecked])

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
                setIsFirst={setIsFirst}
            />
            {isLoader ? <Preloader /> : ''}
            <MoviesCardList>
                <RenderMovies
                    isFirst={isFirst}
                    setTextError={setTextError}
                    textError={textError}
                    movies={foundMovies}
                    isLoader={isLoader}
                    countMovies={countMovies}
                    isChecked={isChecked}
                    unpinMovie={unpinMovie}
                    mode="liked"
                />
            </MoviesCardList>
            {isButtonMoreEnabled ? <ButtonMore onClick={handleButtonMore} /> : ''}
        </main>
    );
};

export default SavedMovies;
