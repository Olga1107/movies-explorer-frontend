import { useEffect, useState } from 'react';
import { filterShortMovies, filterMovies } from '../utils';
import {
      MOBILE_MOVIES,
      MOBILE_MOVIES_ADD,
      TABLES_SMALL_MOVIES,
      TABLES_BIG_MOVIES,
      TABLET_SMALL_WIDTH,
      TABLET_BIG_WIDTH,
      TABLET_SMALL_MOVIES_ADD,
      TABLET_BIG_MOVIES_ADD,
      DESKTOP_MOVIES,
      DESKTOP_MOVIES_ADD,
      DESKTOP_WIDTH,
} from '../constants';

const useMoviesDisplay = ({ movies, isChecked, initialName }) => {
    const [windowSize, setWindowsSize] = useState(window.innerWidth);
    const [countMovies, setCountMovies] = useState(0);
    const [isButtonMoreEnabled, setIsButtonMoreEnabled] = useState(false);

    const handleWindowSize = () => {
        setWindowsSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => {
            window.removeEventListener('resize', handleWindowSize);
        };
    }, []);

    useEffect(() => {
        if (windowSize >= DESKTOP_WIDTH) {
            setCountMovies(DESKTOP_MOVIES);
        } else if (windowSize >= TABLET_BIG_WIDTH) {
            setCountMovies(TABLES_BIG_MOVIES);
        } else if (windowSize >= TABLET_SMALL_WIDTH) {
            setCountMovies(TABLES_SMALL_MOVIES)
        } else {
            setCountMovies(MOBILE_MOVIES);
        }
    }, [windowSize]);

    useEffect(() => {
        const foundMovies = filterMovies(movies, initialName);
        const filterIsCheckedMovies = (filterShortMovies(foundMovies || [], isChecked) || []);
        filterIsCheckedMovies.length > countMovies ? setIsButtonMoreEnabled(true) : setIsButtonMoreEnabled(false);
    }, [countMovies, movies, isChecked, initialName]);

    const handleButtonMore = () => {
        if (windowSize >= DESKTOP_WIDTH) {
            setCountMovies((prevCount) => prevCount + DESKTOP_MOVIES_ADD);
        } else if (windowSize >= TABLET_BIG_WIDTH) {
            setCountMovies((prevCount) => prevCount + TABLET_BIG_MOVIES_ADD);
        } else if (windowSize >= TABLET_SMALL_WIDTH) {
        setCountMovies((prevCount) => prevCount + TABLET_SMALL_MOVIES_ADD);
        } else {
            setCountMovies((prevCount) => prevCount + MOBILE_MOVIES_ADD);
        }
    };

    return { countMovies, isButtonMoreEnabled, handleButtonMore };
};

export default useMoviesDisplay;
