import React, { useState } from 'react';
import classNames from 'classnames';

const CheckboxDropdown = ({ options, selectedOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      onSelect([...selectedOptions, value]);
    } else {
      onSelect(selectedOptions.filter(item => item !== value));
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={classNames("dropdown-button", { "is-open": isOpen })}
        onClick={toggleDropdown}
      >
        {selectedOptions.length > 0
          ? `${selectedOptions.length} vehicle(s) selected`
          : "Select Vehicle"}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <label key={option.dbId} className="dropdown-item">
              <input
                type="checkbox"
                value={`${option.carCompany} ${option.carName} ${option.carModal}`}
                checked={selectedOptions.includes(`${option.carCompany} ${option.carName} ${option.carModal}`)}
                onChange={handleCheckboxChange}
              />
              {option.carCompany} {option.carName} {option.carModal}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
