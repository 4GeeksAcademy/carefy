import React from 'react';

const RadioButton = ({ alias, value, checked, onChange }) => {
    const changeSpaces = alias.replace(/\s+/g, '_');

    return (
        <>
            <div>
                <p className='fs-5 fw-bold'>Selecciona el usuario al que deseas buscar un acompañante</p>
            </div>
            <div className="form-check d-flex align-items-start fs-5 gap-2">
                <input
                    type="radio"
                    id={`patient-${changeSpaces}`}
                    name="patient"
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="form-check-input border border-secondary"
                />
                <label htmlFor={`patient-${changeSpaces}`} className="form-check-label fs-5">
                    {alias}
                </label>
            </div>
        </>
    );
};

export default RadioButton;
