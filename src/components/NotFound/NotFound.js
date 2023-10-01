import React from 'react';
import './NotFound.css';

const NotFound = () => {

return(<main className="notFound">
<div className="notFound__info">
  <div>
    <h1 className="notFound__title">404</h1>
    <p className="notFound__description">Страница не найдена</p>
  </div>
  <a className="link notFound__link" href="/">
    Назад
  </a>
</div>
</main>)
}

export default NotFound;
