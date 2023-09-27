import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="footer__container">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BestFilm</h2>
            <nav className="footer__nav">
                <a
                    className="link footer__nav-link"
                    href="https://practicum.yandex.ru/"
                    rel="noreferrer"
                    target="_blank"
                >
                    Яндекс.Практикум
                </a>
                <a
                    className="link footer__nav-link"
                    href="https://github.com/Olga1107"
                    rel="noreferrer"
                    target="_blank"
                >
                    Github
                </a>
            </nav>
            <p className="footer__nav-copyright">&copy; 2023</p>
        </div>
    </footer>
);

export default Footer;