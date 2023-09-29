import React, { useState, useContext, useEffect } from 'react';
import './Register.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import AuthInput from '../AuthInput/AuthInput';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../utils/validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Register = ({ isLoader, onRegister, errorSubmitApi }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isEmailValid = validateEmail(email) === '';
    const isPasswordValid = validatePassword(password) === '';
    const isNameValid = validateName(name) === '';
    setIsFormValid(isEmailValid && isPasswordValid && isNameValid && !isLoader);
  }, [email, password, name, isLoading]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    onRegister({
      name: name,
      email: email,
      password: password,
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleEmailChange = (newValue) => {
    setEmail(newValue);
  };

  const handlePasswordChange = (newValue) => {
    setPassword(newValue);
  };

  const handleNameChange = (newValue) => {
    setName(newValue);
  };

  return (
    <form className="auth__form-register" onSubmit={handleSubmit} noValidate>
      <div>
        <AuthTitle title={`Добро пожаловать!`} />
        <div className="auth__inputs">
          <AuthInput
            name="Имя"
            idName="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            isValid={validateName(name) === ''}
            disabled={isLoading}
          />
          <span className="auth__input-error">{validateName(name)}</span>
          <AuthInput
            name="E-mail"
            idName="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            isValid={validateEmail(email) === ''}
            disabled={isLoading}
          />
          <span className="auth__input-error">{validateEmail(email)}</span>
          <AuthInput
            name="Пароль"
            idName="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            isValid={validatePassword(password) === ''}
            disabled={isLoading}
          />
          <span className="auth__input-error">
            {validatePassword(password)}
          </span>
        </div>
      </div>
      <AuthSubmit
        textButton={`${
          isLoader ? 'Идет регистрация...' : 'Зарегистрироваться'
        }`}
        textPreLink="Уже зарегистрированы? "
        textLink="Войти"
        textInfoSubmit={errorSubmitApi}
        urlLinkSubmit="/signin"
        disabled={!isFormValid}
      />
    </form>
  );
};

export default Register;
