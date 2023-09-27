import React from 'react';
import './AuthInput.css';

const AuthInput = ({ name, idName, type, value, isProfile = false, onChange, disabled, isValid }) => {
    const classContainer = `auth__input-container${isProfile ? ' auth__input-container_type_profile' : ''}`;
    const classLabel = `auth__label${isProfile ? ' auth__label_type_profile' : ''}`;
    const classInput = `auth__input ${isValid ? '' : 'auth__input-error-active'}${
        isProfile ? ' auth__input_type_profile' : ''
    }`;

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        onChange(inputValue);
    };

    return (
        <div className={classContainer}>
            <label className={classLabel} htmlFor={`auth-${idName}`}>
                {name}
            </label>
            <input
                className={classInput}
                id={`auth-${idName}`}
                placeholder={name}
                type={type}
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
            />
        </div>
    );
};

export default AuthInput;
