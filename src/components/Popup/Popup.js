import React, { useEffect } from 'react';
import './Popup.css';

const Popup = ({ name, isOpen, onClose, children }) => {
    const classPopupOpened = `${isOpen ? 'popup_opened' : ''}`;
    const handleOverlayClose = (evt) => evt.target === evt.currentTarget && onClose();

    const handleEscClosePopup = (evt) => {
        if (evt.key !== 'Escape') return;

        onClose();
    };

    const setHandleEscClosePopup = () => {
        document.addEventListener('keydown', handleEscClosePopup);
    };

    const removeHandleEscClosePopup = () => {
        document.removeEventListener('keydown', handleEscClosePopup);
    };

    useEffect(() => {
        isOpen ? setHandleEscClosePopup() : removeHandleEscClosePopup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <div className={`popup popup_type_${name} ${classPopupOpened}`} onClick={handleOverlayClose}>
            <div className="popup__container">
                <button className="popup__button-close" onClick={onClose} type="button" aria-label="Закрыть"></button>
                {children}
            </div>
        </div>
    );
};

export default Popup;

