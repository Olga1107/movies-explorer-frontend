import React from 'react';
import './HeaderAuth.css';
import { Link } from 'react-router-dom';

const HeaderAuth = () => (
    <nav className="header__auth">
        <Link to="/signup" className="link header__auth-link">
            Регистрация
        </Link>
        <Link to="/signin" className="link header__auth-link header__auth-link_type_login">
            Войти
        </Link>
    </nav>
);

export default HeaderAuth;
