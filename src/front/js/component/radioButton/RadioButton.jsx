import React from 'react';

const RadioButton = ({ alias, value, checked, onChange }) => {
    const changeSpaces = alias.replace(/\s+/g, '_');

    return (
        <div className="form-check">
            <input
                type="radio"
                id={`patient-${changeSpaces}`}
                name="patient"
                value={value}
                checked={checked}
                onChange={onChange}
                className="form-check-input"
            />
            <label htmlFor={`patient-${changeSpaces}`} className="form-check-label">
                {alias}
            </label>
        </div>
    );
};

export default RadioButton;
