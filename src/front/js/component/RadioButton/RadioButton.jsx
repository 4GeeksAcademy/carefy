import React from 'react';

const RadioButton = ({ alias, value, checked, onChange, id }) => {
    const id_patient = id

    return (
        <>
            <div className="form-check d-flex align-items-start fs-5 gap-2">
                <input
                    type="radio"
                    id={`patient-${id_patient}`}
                    name="patient"
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="form-check-input border border-secondary"
                />
                <label htmlFor={`patient-id_patient`} className="form-check-label fs-5">
                    {alias}
                </label>
            </div>
        </>
    );
};

export default RadioButton;
