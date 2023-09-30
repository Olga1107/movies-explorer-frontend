import React, { useEffect } from 'react';
import './ModalTrailer.css';
import YouTube from 'react-youtube';

const ModalTrailer = ({ onClose, trailerLink }) => {
    const getYouTubeVideoId = (url) => {
        if (!url || typeof url !== 'string' || !url.includes('v=')) return '';
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    };
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };

        const handleOverlayClick = (event) => {
            if (event.target.classList.contains('modal')) {
                handleCloseModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleOverlayClick);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleOverlayClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const opts = {
        playerVars: {
            autoplay: 1,
        },
    };

    if (!trailerLink || typeof trailerLink !== 'string') return null;

    const handleCloseModal = () => {
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="modal-close" onClick={handleCloseModal} type="button">
                    &times;
                </button>
                <YouTube videoId={getYouTubeVideoId(trailerLink)} opts={opts} />
            </div>
        </div>
    );
};

export default ModalTrailer;