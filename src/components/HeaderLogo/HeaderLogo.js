import React from 'react';
import './HeaderLogo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const HeaderLogo = () => (
    <Link className="link header__logo-link" to="/">
        <img src={logo} className="header__logo" alt="Логотип" />
    </Link>
);

export default HeaderLogo;
