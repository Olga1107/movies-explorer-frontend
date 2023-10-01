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
    const [isFirst, setIsFirst] = useState(true);
    const [textError, setTextError] = useState('Вы ещё ничего не добавили')
    const [query, setQuery] = useState('')

    const handleSearchSubmit = (name = query, isCheckedNew = isChecked) => {
        setQuery(name)
        setFoundMovies(filterMovies(movies, name));      
        setIsChecked(isCheckedNew);
    };


    useEffect(() => {
        if (isFirst === false) {
            setTextError(foundMovies.length === 0 ? 'Ничего не найдено' : '')
        }
    }, [foundMovies, isFirst, isChecked])

    useEffect(() => {
        handleSearchSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    isChecked={isChecked}
                    unpinMovie={unpinMovie}
                    mode="liked"
                />
            </MoviesCardList>
        </main>
    );
};

export default SavedMovies;
