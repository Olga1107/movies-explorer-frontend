import React from 'react';
import '../AboutProject/AboutProject';
import './Technologies.css';

const Technologies = () => (
    <section className="technologies">
        <div className="project technologies__container">
            <h2 className="project__title technologies__title">Технологии</h2>
            <h3 className="technologies__subtitle">7 технологий</h3>
            <p className="project__description technologies__description">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <ul className="technologies__list">
                <li className="technologies__item">HTML</li>
                <li className="technologies__item">CSS</li>
                <li className="technologies__item">JS</li>
                <li className="technologies__item">React</li>
                <li className="technologies__item">Git</li>
                <li className="technologies__item">Express.js</li>
                <li className="technologies__item">mongoDB</li>
            </ul>
        </div>
    </section>
);

export default Technologies;
