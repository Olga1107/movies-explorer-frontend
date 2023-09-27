import React from 'react';
import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

const AboutMe = () => (
    <section className="project about-me">
        <h2 className="project__title about-me__title">Студентка</h2>
        <img src={avatar} className="about-me__photo" alt="Мое фото" />
        <div className="about-me__info">
            <h3 className="about-me__name">Ольга</h3>
            <p className="about-me__job">Фронтенд-разработчик, 28 лет</p>
            <p className="project__description about-me__description">
            По первому образованию я менеджер по туризму. До начала учбы в Практикуме отработала 8 лет в гостинице в должности управляющего. 
            Решила попробовать что&#8209;то новое, так как всегда было интересно создание сайтов. Так я оказалась в Практикуме.
            Сейчас замужем, детей пока нет. Проживаю в городе Москва. Продолжаю работу в крупной гостиничной сети.
            В будущем надеюсь сделать работу в IT своей второй профессией.
            </p>
            <a className="link about-me__link" href="https://github.com/Olga1107" rel="noreferrer" target="_blank">Github</a>
        </div>
    </section>
);

export default AboutMe;