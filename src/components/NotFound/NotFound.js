import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';


const NotFound = () =>{ 
const navigate = useNavigate();

return(
  <main className="notFound">
    <div className="notFound__info">
      <div>
        <h1 className="notFound__title">404</h1>
        <p className="notFound__description">Страница не найдена</p>
      </div>
      <button className="link notFound__link" href="/" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  </main>
);};

export default NotFound;
