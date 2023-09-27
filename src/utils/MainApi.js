import { BASE_IMAGE_URL, BASE_MAIN_URL } from './constants';

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(res.json());
    }

    register = ({ name, email, password }) => {
        return fetch(`${BASE_MAIN_URL}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        }).then(this._checkResponse);
    };

    authorize = ({ email, password }) => {
        return fetch(`${BASE_MAIN_URL}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    };

    getUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    updateUser({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        }).then(this._checkResponse);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    createMovie({ country, director, duration, year, description, image, trailerLink, id, nameRU, nameEN }) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image: BASE_IMAGE_URL + image.url,
                trailerLink,
                thumbnail: BASE_IMAGE_URL + image.formats.thumbnail.url,
                movieId: id,
                nameRU,
                nameEN,
            }),
        }).then(this._checkResponse);
    }

    removeMovie(movie) {
        return fetch(`${this._baseUrl}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }
}

export const mainApi = new Api(BASE_MAIN_URL);
  