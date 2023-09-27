import React, { useState, useEffect, useContext, useRef } from 'react';
import './Profile.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthInput from '../AuthInput/AuthInput';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import { validateName, validateEmail } from '../../utils/validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onSignOut, onUpdateUser, errorSubmitApi, clearErrorSubmitApi }) => {
    const currentUser = useContext(CurrentUserContext);

    const [username, setUsername] = useState(currentUser.name || '');
    const [email, setEmail] = useState(currentUser.email || '');
    const [isEditMode, setIsEditMode] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const saveButtonStyleClass = 'auth__button-submit_type_profile-save';
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    useEffect(() => {
        setIsSaveButtonActive(!errorSubmitApi);
    }, [errorSubmitApi]);

    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);

    // Using useRef to hold the initial username and email values
    const initialUsernameRef = useRef(currentUser.name || '');
    const initialEmailRef = useRef(currentUser.email || '');

    useEffect(() => {
        initialUsernameRef.current = currentUser.name || '';
        initialEmailRef.current = currentUser.email || '';
    }, [currentUser]);

    useEffect(() => {
        const isUsernameChanged = username !== initialUsernameRef.current;
        const isEmailChanged = email !== initialEmailRef.current;
        setIsSaveButtonActive(isEditMode && (isUsernameChanged || isEmailChanged));
    }, [username, email, isEditMode]);

    const validateForm = () => {
        const errors = [];

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        const usernameValidationResult = validateName(trimmedUsername);
        const emailValidationResult = validateEmail(trimmedEmail);

        if (isEditMode) {
            if (usernameValidationResult !== '') {
                errors.push(usernameValidationResult);
            }
            if (emailValidationResult !== '') {
                errors.push(emailValidationResult);
            }
        }

        setIsUsernameValid(usernameValidationResult === '');
        setIsEmailValid(emailValidationResult === '');

        setIsSaveButtonActive(errors.length === 0);

        setErrorMessages([...errors]);

        return errors.length === 0;
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateUser({
            email: email,
            name: username,
        });
    };

    useEffect(() => {
        if (!isEditMode) {
            setErrorMessages([]);
        }
    }, [isEditMode]);

    const handleSaveProfile = () => {
        if (validateForm()) {
            setIsEditMode(false);
            setErrorMessages([]);
            onUpdateUser({
                email: email,
                name: username,
            }).then(() => {
                clearErrorSubmitApi();
            });
        }
    };

    const toggleEditing = () => {
        setIsEditMode((prevMode) => !prevMode);
    };

    return (
        <main className="auth">
            <form className="auth__form auth__form_type_profile" onSubmit={handleSubmit} noValidate>
                <AuthTitle title={`Привет, ${username}!`} isProfile={true} />
                {errorMessages.length > 0 && (
                    <div className="auth__form_type_profile-error-messages">
                        {errorMessages.map((error, index) => (
                            <span key={index} className="auth__form_type_profile-error-message">
                                {error}
                            </span>
                        ))}
                    </div>
                )}
                <div className={`auth__inputs auth__inputs_type_profile ${isEditMode ? 'editing' : ''}`}>
                    <AuthInput
                        name="Имя"
                        idName="name"
                        type="type"
                        value={username}
                        isProfile={true}
                        onChange={(value) => {
                            setUsername(value);
                            validateForm();
                        }}
                        disabled={!isEditMode}
                        isValid={isUsernameValid}
                    />

                    <AuthInput
                        name="E-mail"
                        idName="email"
                        type="email"
                        value={email}
                        isProfile={true}
                        onChange={(value) => {
                            setEmail(value);
                            validateForm();
                        }}
                        disabled={!isEditMode}
                        isValid={isEmailValid}
                    />
                </div>
                {isEditMode ? (
                    <AuthSubmit
                        textButton="Сохранить"
                        textPreLink=""
                        textLink=""
                        isProfile={true}
                        urlLinkSubmit=""
                        onClick={handleSaveProfile}
                        customStyleClass={saveButtonStyleClass}
                        disabled={!isSaveButtonActive}
                        textInfoSubmit={errorSubmitApi}
                    />
                ) : (
                    <AuthSubmit
                        textButton="Редактировать"
                        textPreLink=""
                        textLink="Выйти из аккаунта"
                        isProfile={true}
                        urlLinkSubmit="/logout"
                        onClick={toggleEditing}
                        onSignOut={onSignOut}
                        textInfoSubmit={errorSubmitApi}
                    />
                )}
            </form>
        </main>
    );
};

export default Profile;
