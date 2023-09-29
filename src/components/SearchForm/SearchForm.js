import React, { useEffect, useState, useRef } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

const SearchForm = ({
  onSubmit,
  onInputSearchError,
  initialName = '',
  isChecked,
  handleInputChecked,
}) => {
  const [searchValue, setSearchValue] = useState(initialName);
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    setSearchValue(initialName);
  }, [initialName]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (location.pathname === '/movies')
      localStorage.setItem('name', searchValue);
    if (searchValue !== '') {
      onSubmit(searchValue, isChecked);
    } else {
      onInputSearchError();
    }
  };

  const handleInputChange = (evt) => {
    setSearchValue(evt.target.value);
  };

  const handleCheckboxChange = () => {
    handleInputChecked();
    onSubmit(searchValue, !isChecked);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__container">
        <input
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleInputChange}
          required
          value={searchValue}
          ref={searchInputRef}
        />
        <button className="link search-form__button" type="submit" />
        <div className="search-form__column"></div>
        <div className="search-form__checkbox-container search-form__checkbox-container_big">
          <FilterCheckbox
            onChange={handleCheckboxChange}
            isChecked={isChecked}
          />
        </div>
      </div>
      <div className="search-form__checkbox-container search-form__checkbox-container_small">
        <FilterCheckbox onChange={handleCheckboxChange} isChecked={isChecked} />
      </div>
      <div className="search-form__row"></div>
    </form>
  );
};

export default SearchForm;
