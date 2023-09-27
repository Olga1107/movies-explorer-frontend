const checkTextIncludes = (str, substr) => str.toLowerCase().includes(substr.toLowerCase());

const filterMovies = (dataMovies, name) => {
    if (name === '') {
        return dataMovies;
    }
    const movies = dataMovies.filter(
        (movie) => checkTextIncludes(movie.nameRU, name) || checkTextIncludes(movie.nameRU, name),
    );
    return movies;
};

const filterShortMovies = (movies, isChecked) => {
    if (isChecked) {
        return movies.filter((movie) => movie.duration <= 40);
    } else {
        return movies;
    }
};

function convertToHoursMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    function getNoun(number, one, two, five) {
        const modTen = number % 10;
        const modHundred = number % 100;

        if (modTen === 1 && modHundred !== 11) {
            return one;
        } else if (modTen >= 2 && modTen <= 4 && (modHundred < 10 || modHundred >= 20)) {
            return two;
        } else {
            return five;
        }
    }

    let result = '';
    if (hours > 0) {
        result += `${hours} ${getNoun(hours, 'час', 'часа', 'часов')} `;
    }
    if (minutes > 0) {
        result += `${minutes} ${getNoun(minutes, 'минута', 'минуты', 'минут')}`;
    }

    return result.trim();
}

export { filterMovies, filterShortMovies, convertToHoursMinutes };
