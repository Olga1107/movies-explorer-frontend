import React, { useEffect, useState } from 'react';
import './Header.css';
import { useLocation } from 'react-router-dom';
import HeaderNav from '../HeaderNav/HeaderNav';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderAuth from '../HeaderAuth/HeaderAuth';

const Header = ({ isLoggedIn }) => {
    const location = useLocation();
    const [isTypeAuth, setIsTypeAuth] = useState(false);
    const [isTypeMain, setIsTypeMain] = useState(false);
    const typesAuth = ['/signin', '/signup'];

    const classHeader = `header${isTypeAuth ? ' header_type_auth' : ''}${isTypeMain ? ' header_type_main' : ''}`;

    useEffect(() => {
        location.pathname === '/' ? setIsTypeMain(true) : setIsTypeMain(false);
        typesAuth.includes(location.pathname) ? setIsTypeAuth(true) : setIsTypeAuth(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <header className={classHeader}>
            <div className={`header__container${isTypeAuth ? ' header__container_type_auth' : ''}`}>
                <HeaderLogo></HeaderLogo>
                {isTypeAuth ? '' : isLoggedIn ? <HeaderNav isMain={isTypeMain} /> : <HeaderAuth />}
            </div>
        </header>
    );
};

export default Header;