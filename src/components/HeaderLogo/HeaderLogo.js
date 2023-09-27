import React from 'react';
import './HeaderLogo.css';
import logo from '../../images/logo.svg';

const HeaderLogo = () => (
    <a className="link header__logo-link" href="/">
        <img src={logo} className="header__logo" alt="Логотип" />
    </a>
);

export default HeaderLogo;
