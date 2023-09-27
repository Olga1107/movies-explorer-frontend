import { BASE_MOVIES_URL } from './constants';

class MoviesApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(`${this._baseUrl}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }
}

export const moviesApi = new MoviesApi(BASE_MOVIES_URL);
  