import React from 'react';
import './AboutProject.css';

const AboutProject = () => (
    <section className="project about-project" id="about-project">
        <h2 className="project__title">О проекте</h2>
        <ul className="about-project__points">
            <li className="about-project__point">
                <h3 className="project__title about-project__point-title">Дипломный проект включал 5 этапов</h3>
                <p className="project__description">
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>
            </li>
            <li className="about-project__point">
                <h3 className="project__title about-project__point-title">На выполнение диплома ушло 5 недель</h3>
                <p className="project__description">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
                    защититься.
                </p>
            </li>
        </ul>
        <ul className="about-project__schedules">
            <li className="about-project__schedule">
                <p className="about-project__schedule-period">1 неделя</p>
                <p className="about-project__schedule-title">Back-end</p>
            </li>
            <li className="about-project__schedule">
                <p className="about-project__schedule-period">4 недели</p>
                <p className="about-project__schedule-title">Front-end</p>
            </li>
        </ul>
    </section>
);

export default AboutProject;