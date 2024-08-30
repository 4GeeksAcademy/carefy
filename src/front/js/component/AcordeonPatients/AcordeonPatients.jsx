import React from 'react';
import styles from './acordeonPatients.module.css';
import profileImg from "../../../img/profileImg.png"

const AcordeonPatients = ({ alias, firstName, lastName, photo, description, age, dependency, province, phone, location, birthdate }) => {

    function capitalizeFirstLetter(string) {
        if (string.length === 0) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className={`accordion-button collapsed ${styles.btn_accordion}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${alias.replace(/\s+/g, '_')}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${alias.replace(/\s+/g, '_')}`}
                >
                    {capitalizeFirstLetter(alias)}
                </button>
            </h2>
            <div
                id={`collapse-${alias.replace(/\s+/g, '_')}`}
                className="accordion-collapse collapse"
                data-bs-parent="#patientAccordion"
            >
                <div className="accordion-body row">
                    <div className={`col-3 mb-3 ${styles.image}`}>
                        {photo ? (
                            <img
                                src={photo}
                                alt={`Foto de ${alias}`}
                                className={`img-fluid mb-3`}
                            />
                        ) : (
                            <img
                                src={profileImg}
                                alt={`Foto de ${alias}`}
                                className={`img-fluid mb-3 ${styles.image}`}
                            />
                        )}
                    </div>
                    <div className='col-9 row'>
                        <div className='col-6'>
                        <p className='fs-5'><span className="fa-solid fa-user pe-2"></span><span className="pe-2">{firstName}</span>{lastName}</p>
                        <p className='fs-5'><span className="fa-solid fa-id-card pe-2"></span>{age} años</p>
                        <p className='fs-5'><span className="fa-solid fa-location-dot pe-2"></span>{location},<span className='ps-1'>{province}</span></p>
                        </div>
                        <div className='col-6'>
                        <p className='fs-5'><span className={styles.content_accordion}>Fecha de nacimiento:</span> {birthdate}</p> 
                        <p className='fs-5'><span className={styles.content_accordion}>Dependencia:</span> {dependency}</p>
                        <p className='fs-5'><span className={styles.content_accordion}>Teléfono:</span> {phone}</p>
                        </div>
                    </div>
                    <p className="fw-bold fs-5">Observaciones</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default AcordeonPatients;
