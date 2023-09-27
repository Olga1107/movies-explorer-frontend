import React from 'react';
import './Portfolio.css';
import '../AboutProject/AboutProject';

const Portfolio = () => (
    <section className="project portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__links">
            <li className="portfolio__link-item">
                <a
                    className="link portfolio__link"
                    href="https://github.com/Olga1107/how-to-learn"
                    rel="noreferrer"
                    target="_blank"
                >
                    Статичный сайт
                </a>
            </li>
            <li className="portfolio__link-item">
                <a
                    className="link portfolio__link"
                    href="https://github.com/Olga1107/russian-travel"
                    rel="noreferrer"
                    target="_blank"
                >
                    Адаптивный сайт
                </a>
            </li>
            <li className="portfolio__link-item">
                <a
                    className="link portfolio__link"
                    href="https://github.com/Olga1107/react-mesto-api-full-gha"
                    rel="noreferrer"
                    target="_blank"
                >
                    Одностраничное приложение
                </a>
            </li>
        </ul>
    </section>
);

export default Portfolio;