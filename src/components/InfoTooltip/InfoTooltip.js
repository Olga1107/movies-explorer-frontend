import React from 'react';
import Popup from '../Popup/Popup';

const InfoTooltip = ({ name, buttonText, isError, message, isOpen, onClose, onSubmit }) => {
    const classMessage = `popup__message${isError ? ' popup__message_type_error' : ''}`;
    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className="popup__info-container">
                <h3 className={classMessage}>{message}</h3>
                <button className={`popup__button popup__button_type_submit`} onClick={handleSubmit} type="button">
                    {buttonText}
                </button>
            </div>
        </Popup>
    );
};

export default InfoTooltip;
