import React from 'react';
import './Promo.css';
import logo from '../../images/pic__COLOR_landing-logo.svg';

const Promo = () => {
    /*const handleScroll = () => {
        const aboutProjectSection = document.getElementById('about-project');
        if (aboutProjectSection) {
            aboutProjectSection.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };*/

    return (
        <section className="promo">
            <div className="promo__container">
                <img src={logo} className="promo__logo" alt="Логотип Планета"></img>
                <div className="promo__info">
                    <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                   {/*<p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <a className="link promo__link" onClick={handleScroll}>
                        Узнать больше
                    </a>*/}
                </div>
            </div>
        </section>
    );
};

export default Promo;
