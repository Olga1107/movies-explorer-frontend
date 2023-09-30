import React from 'react';
import './AuthSubmit.css';
import { Link } from 'react-router-dom';

const AuthSubmit = ({
  textButton,
  textPreLink,
  textLink,
  isProfile = false,
  urlLinkSubmit,
  onClick,
  customStyleClass,
  disabled,
  textInfoSubmit,
  onSignOut,
}) => {
  const classContainer = `auth__submit-container ${
    isProfile ? ' auth__submit-container_type_profile' : ''
  }`;
  const classButton = `link auth__button-submit ${
    isProfile ? ' auth__button-submit_type_profile' : ''
  } ${customStyleClass || ''}`;
  const classText = `auth__text${isProfile ? ' auth__text_type_profile' : ''}`;
  const classLink = `link auth__link${
    isProfile ? ' auth__link_type_profile' : ''
  }`;
  const linkTextUrl = isProfile ? (
    <a onClick={onSignOut} className={classLink}>
      {textLink}
    </a>
  ) : (
    <Link to={urlLinkSubmit} className={classLink}>
      {textLink}
    </Link>
  );

  return (
    <div className={classContainer}>
      <span className="auth__submit-error">{textInfoSubmit}</span>{' '}
      <button
        className={`${classButton} ${disabled ? 'disabled' : ''}`}
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        {textButton}
      </button>
      <p className={classText}>
        {textPreLink}
        {linkTextUrl}
      </p>
    </div>
  );
};

export default AuthSubmit;
