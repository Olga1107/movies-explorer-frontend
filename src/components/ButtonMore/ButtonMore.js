import React from 'react';
import './ButtonMore.css';

const ButtonMore = ({ onClick }) => {
    return (
        <button className="button-more" onClick={onClick}>
            Ещё
        </button>
    );
};

export default ButtonMore;
