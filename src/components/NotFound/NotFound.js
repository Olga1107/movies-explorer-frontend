import React from 'react';
import './NotFound.css';

const NotFound = () => (
    <main className="notFound">
        <div className="notFound__info">
            <h1 className="notFound__title">404</h1>
            <p className="notFound__description">Страница не найдена</p>
        </div>
        <a className="link notFound__link" href="/">
            Назад
        </a>
    </main>
);

export default NotFound;
