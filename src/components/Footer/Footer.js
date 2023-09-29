import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BestFilm
      </h2>
      <nav className="footer__nav">
        <ul className="footer__nav-list">
          <li>
            <Link
              className="link footer__nav-link"
              href="https://practicum.yandex.ru/"
              rel="noreferrer"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li>
            <Link
              className="link footer__nav-link"
              href="https://github.com/Olga1107"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>
      </nav>
      <p className="footer__nav-copyright">&copy; 2023</p>
    </div>
  </footer>
);

export default Footer;
