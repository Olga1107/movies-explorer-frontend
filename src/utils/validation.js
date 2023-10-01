export const validateName = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue === '') {
        return 'Поле Имя не должно быть пустым';
    }

    // Дополнительная проверка на допустимые символы для имени (только буквы, пробелы и дефисы)
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!nameRegex.test(trimmedValue)) {
        return 'Имя может содержать только буквы, пробелы и дефисы';
    }

    // Проверка на минимальную длину имени (минимум 2 буквы)
    const nameLength = trimmedValue.length;
    if (nameLength < 2) {
        return 'Имя должно содержать минимум две буквы';
    }

    return '';
};

export const validateEmail = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue === '') {
        return 'Поле E-mail не должно быть пустым';
    }

    // Простая проверка на наличие @ и хотя бы одной точки после @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedValue)) {
        return 'Некорректный формат E-mail';
    }

    return '';
};

export const validatePassword = (value) => {
    if (value === '') {
        return 'Поле Пароль не должно быть пустым';
    }

    // Проверка на длину пароля
    if (value.length < 8) {
        return 'Пароль должен содержать не менее 8 символов';
    }

    // Проверка на наличие заглавной, строчной букв и цифры
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(value)) {
        return 'Пароль должен содержать как минимум одну заглавную и строчную буквы латинского алфавита и одну цифру';
    }

    return '';
};
