import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Technologies from '../Technologies/Technologies';
import Portfolio from '../Portfolio/Portfolio';

const Main = () => (
    <main className="main">
        <Promo></Promo>
        <AboutProject></AboutProject>
        <Technologies></Technologies>
        <AboutMe></AboutMe>
        <Portfolio></Portfolio>
    </main>
);

export default Main;
