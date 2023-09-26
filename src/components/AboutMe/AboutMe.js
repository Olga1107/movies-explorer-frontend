import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <h2 className="about-me__header">Студентка</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Ольга</h3>
          <p className="about-me__job">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__description">
            По первому образованию я менеджер по туризму. До начала учбы в Практикуме отработала 8 лет в гостинице в должности управляющего. 
            Решила попробовать что-то новое, так как всегда было интересно создание сайтов. Так я оказалась в Практикуме.
            Сейчас замужем, детей пока нет. Проживаю в городе Москва. Продолжаю работу в крупной гостиничной сети.
            В будущем надеюсь сделать работу в IT своей второй профессией.
          </p>

          <ul className="about-me__links">
            <li><a className="about-me__link" href="https://github.com/Olga1107" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>

        <img src={avatar} alt="about-me" className="about-me__image" />
      </div>
    </section>
  );
};

export default AboutMe;