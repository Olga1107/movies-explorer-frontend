import React from 'react';
import './Promo.css';
import { Link } from 'react-scroll';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
      </div>
      <nav className="promo__nav">
        <Link 
        className="promo__nav-item link"
        to='about-project'
        smooth
        duration={500}
        >О проекте</Link>
        <Link 
        className="promo__nav-item link"
        to='technologies'
        smooth
        duration={500}
        >Технологии</Link>
        <Link 
        className="promo__nav-item link"
        to='about-me'
        smooth
        duration={500}
        >Студент</Link>
      </nav>
    </section>
  );
};

export default Promo;
