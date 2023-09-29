import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ isChecked, onChange }) => {
    return (
        <div className="checkbox">
            <input type="checkbox" className="checkbox__switcher" checked={isChecked} onChange={onChange} />
            <span className="checkbox__text">Короткометражки</span>
        </div>
    );
};

export default FilterCheckbox;
