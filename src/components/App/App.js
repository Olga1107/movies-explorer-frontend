import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import './App.css';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/utils';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({
        name: '',
        isLoggedIn: false,
        email: '',
        _id: '',
    });
    const [isLoader, setIsLoader] = useState(false);
    const [isProfileLoader, setIsProfileLoader] = useState(false);
    const [isLoginLoader, setIsLoginLoader] = useState(false);
    const [isRegisterLoader, setIsRegisterLoader] = useState(false);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [errorSubmitApi, setErrorSubmitApi] = useState('');
    const [isFooterDisabled, setIsFooterDisabled] = useState(false);
    const routesFootersDisabled = ['/signin', '/signup', '/profile', '/404'];
    const [isHeaderDisabled, setIsHeaderDisabled] = useState(false);
    const routesHeaderDisabled = ['/404'];
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const routesRedirectLogined = ['/signin', '/signup'];
    const [savedMoviesLoaded, setSavedMoviesLoaded] = useState(false);

    const getLikedMoviesFromStorage = () => {
        const likedMovies = localStorage.getItem('likedMovies');
        return likedMovies ? JSON.parse(likedMovies) : {};
    };

    const saveLikedMoviesToStorage = (likedMovies) => {
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    };

    useEffect(() => {
        if (isTokenChecked && currentUser.isLoggedIn) {
            routesRedirectLogined.includes(location.pathname) && navigate('/movies');
            getMovies();
            getSavedMovies();
        }
    }, [isTokenChecked, currentUser.isLoggedIn]);

    const checkToken = async (token) => {
        mainApi
            .getUser(token)
            .then((res) => {
                if (res) {
                    setCurrentUser({
                        ...currentUser,
                        isLoggedIn: true,
                        ...res,
                    });
                }
            })
            .catch((err) => {
                onSignOut();
                console.log(err);
            })
            .finally(() => setIsTokenChecked(true));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            checkToken(token);
        } else {
            setIsTokenChecked(true);
        }
    }, [currentUser.isLoggedIn]);

    const getUser = (token) => {
        return mainApi
            .getUser(token)
            .then((user) => {
                setCurrentUser({ ...user, isLoggedIn: true });
            })
            .catch((res) => {
                res.then((err) => {
                    onSignOut();
                    console.log(err.message);
                });
            });
    };

    const onUpdateUser = ({ email, name }) => {
        setIsProfileLoader(true);
        return mainApi
            .updateUser({ email, name })
            .then((data) => {
                setCurrentUser({ ...currentUser, name: data.name, email: data.email });
                setInfoTooltipProps({
                    ...infoTooltipProps,
                    message: 'Данные успешно обновлены.',
                    buttonText: 'OK',
                    isError: false,
                    onSubmit: closePopup,
                });
                infoTooltipOpen();
            })
            .catch((res) => {
                res.then((err) => {
                    console.log(err.message);
                    setErrorSubmitApi(err.message);
                });
            })
            .finally(() => {
                setIsProfileLoader(false);
            });
    };

    const onLogin = ({ email, password }) => {
        setIsLoginLoader(true);
        return mainApi
            .authorize({ email, password })
            .then((data) => {
                localStorage.setItem('token', data.token);
                setCurrentUser({ ...currentUser, isLoggedIn: true });
                getUser(data.token);
                navigate('/movies');
            })
            .catch((res) => {
                res.then((err) => {
                    setErrorSubmitApi(err.message);
                });
            })
            .finally(() => {
                setIsLoginLoader(false);
            });
    };

    const onRegister = ({ name, email, password }) => {
        setIsRegisterLoader(true);
        return mainApi
            .register({ name, email, password })
            .then(() => {
                onLogin({ email, password });
            })
            .catch((err) => {
                    if (err.statusCode === 400) {
                        setErrorSubmitApi('При регистрации пользователя произошла ошибка.');
                    } else {
                        setErrorSubmitApi(err.message);
                    }
            })
            .finally(() => {
                setIsRegisterLoader(false);
            });
    };

    const onSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('checkbox');
        localStorage.removeItem('movies');
        setIsTokenChecked(false);
        setCurrentUser({ name: '', isLoggedIn: false, email: '', _id: '' });
        navigate('/');
    };

    const getSavedMovies = (name = '') => {
        if (savedMoviesLoaded) {
            setSavedMovies([...filterMovies(savedMovies, name)]);
        } else {
            mainApi
                .getMovies()
                .then((data) => {
                    setSavedMovies(data);
                    setSavedMoviesLoaded(true);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    const getMovies = (name = '', isShort = false) => {
        setIsLoader(true);
        moviesApi
            .getMovies()
            .then((dataMovies) => {
                // Применяем фильтры к фильмам на основе имени и состояния чекбокса
                let filteredMovies = filterMovies(dataMovies, name);
                if (isShort) {
                    filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
                }
                setMovies(filteredMovies);
            })
            .catch(() => errorGetMoviesPopupOpen())
            .finally(() => {
                setIsLoader(false);
            });
    };

    const createMovie = (movie) => {
        return mainApi
            .createMovie({ ...movie })
            .then((createdMovie) => {
                setSavedMovies([...savedMovies, createdMovie]);

                const newLikedMovies = { ...getLikedMoviesFromStorage(), [createdMovie._id]: true };
                saveLikedMoviesToStorage(newLikedMovies);
            })
            .catch((res) => {
                res.then((err) => {
                    console.log(err.message);
                });
            });
    };

    const removeMovie = (movie) => {
        return mainApi
            .removeMovie(movie)
            .then(() => {
                setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));

                const newLikedMovies = { ...getLikedMoviesFromStorage(), [movie._id]: false };
                saveLikedMoviesToStorage(newLikedMovies);
            })
            .catch((res) => {
                res.then((err) => {
                    console.log(err.message);
                });
            });
    };

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [infoTooltipProps, setInfoTooltipProps] = useState({
        message: '',
        isError: false,
        buttonText: '',
        onSubmit: () => {},
    });
    const infoTooltipOpen = () => {
        setIsInfoTooltipOpen(true);
    };
    const closePopup = () => {
        setIsInfoTooltipOpen(false);
    };
    const onInputSearchError = () => {
        setInfoTooltipProps({
            ...infoTooltipProps,
            message: 'Нужно ввести ключевое слово',
            buttonText: 'OK',
            isError: true,
            onSubmit: closePopup,
        });
        infoTooltipOpen();
    };
    const errorGetMoviesPopupOpen = () => {
        setInfoTooltipProps({
            ...infoTooltipProps,
            message:
                'Во время запроса произошла ошибка. ' +
                'Возможно, проблема с соединением или сервер недоступен. ' +
                'Подождите немного и попробуйте ещё раз',
            buttonText: 'OK',
            isError: true,
            onSubmit: closePopup,
        });
        infoTooltipOpen();
    };

    useEffect(() => {
        if (routesFootersDisabled.includes(location.pathname)) {
            setIsFooterDisabled(true);
        }
        if (routesHeaderDisabled.includes(location.pathname)) {
            setIsHeaderDisabled(true);
        }
    }, [location.pathname]);

    const clearErrorSubmitApi = () => {
        setErrorSubmitApi('');
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {!isHeaderDisabled && <Header isLoggedIn={currentUser.isLoggedIn} />}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute
                                isLoggedIn={currentUser.isLoggedIn}
                                element={Movies}
                                onInputSearchError={onInputSearchError}
                                errorGetMoviesPopupOpen={errorGetMoviesPopupOpen}
                                isTokenChecked={isTokenChecked}
                                movies={movies}
                                savedMovies={savedMovies}
                                getMovies={getMovies}
                                pinMovie={createMovie}
                                unpinMovie={removeMovie}
                                isLoader={isLoader}
                            />
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute
                                isLoggedIn={currentUser.isLoggedIn}
                                element={SavedMovies}
                                onInputSearchError={onInputSearchError}
                                errorGetMoviesPopupOpen={errorGetMoviesPopupOpen}
                                isTokenChecked={isTokenChecked}
                                movies={savedMovies}
                                unpinMovie={removeMovie}
                                isLoader={isLoader}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                isLoggedIn={currentUser.isLoggedIn}
                                element={Profile}
                                isLoader={isProfileLoader}
                                onSignOut={onSignOut}
                                onUpdateUser={onUpdateUser}
                                errorSubmitApi={errorSubmitApi}
                                isTokenChecked={isTokenChecked}
                                clearErrorSubmitApi={clearErrorSubmitApi}
                            />
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <Auth>
                                <Login isLoader={isLoginLoader} onLogin={onLogin} errorSubmitApi={errorSubmitApi} />
                            </Auth>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Auth>
                                <Register
                                    isLoader={isRegisterLoader}
                                    onRegister={onRegister}
                                    errorSubmitApi={errorSubmitApi}
                                />
                            </Auth>
                        }
                    />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
                {!isFooterDisabled && <Footer />}
                <InfoTooltip
                    name="confirmation"
                    buttonText={infoTooltipProps.buttonText}
                    isError={infoTooltipProps.isError}
                    message={infoTooltipProps.message}
                    isOpen={isInfoTooltipOpen}
                    onClose={closePopup}
                    onSubmit={infoTooltipProps.onSubmit}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;