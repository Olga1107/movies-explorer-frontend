import React, { useEffect, useState } from 'react';
import './HeaderNav.css';
import { NavLink } from 'react-router-dom';

const HeaderNav = ({ isMain }) => {
    const [isBurgerClose, setIsBurgerClose] = useState(true);
    const classBurgerMenu = isBurgerClose ? 'navigation__button_type_close' : '';
    const classNavigationMenu = isBurgerClose ? ' navigation_type_menu' : '';
    const classNavigationContainerMenu = isBurgerClose ? ' navigation__container_type_menu' : '';
    const classNavigationLinksMenu = isBurgerClose ? '' : ' navigation__links_invisibled';
    const classNavigationProfileMenu = isBurgerClose ? '' : ' navigation__profile_invisibled';
    const classLink = `link navigation__link${isMain ? ' navigation__link_type_main' : ''}`;

    const onButtonBurgerClick = () => {
        setIsBurgerClose((state) => !state);
    };

    const onLinkClick = () => {
        setIsBurgerClose(false);
    };

    useEffect(() => {
        setIsBurgerClose(false);
    }, []);

    return (
        <div className={`navigation${classNavigationMenu}`}>
            <div className={`navigation__container${classNavigationContainerMenu}`}>
                <button className={`navigation__button ${classBurgerMenu}`} onClick={onButtonBurgerClick} type="button"></button>
                <nav className={`navigation__links ${classNavigationLinksMenu}`}>
                    <NavLink to="/" className={`${classLink} navigation__link_type_home`} onClick={onLinkClick}>
                        Главная
                    </NavLink>
                    <NavLink to="/movies" className={classLink} onClick={onLinkClick}>
                        Фильмы
                    </NavLink>
                    <NavLink to="/saved-movies" className={classLink} onClick={onLinkClick}>
                        Сохранённые фильмы
                    </NavLink>
                </nav>
                <NavLink
                    className={`link navigation__profile${classNavigationProfileMenu}`}
                    to="/profile"
                    onClick={onButtonBurgerClick}
                >
                    Аккаунт
                </NavLink>
            </div>
        </div>
    );
};

export default HeaderNav;
