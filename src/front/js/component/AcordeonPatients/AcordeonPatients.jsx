import React from 'react';
import styles from './acordeonPatients.module.css';

const AcordeonPatients = ({ alias, photo, description, age, dependency, province, phone, location }) => {
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
                    {alias}
                </button>
            </h2>
            <div
                id={`collapse-${alias.replace(/\s+/g, '_')}`}
                className="accordion-collapse collapse"
                data-bs-parent="#patientAccordion"
            >
                <div className="accordion-body">
                    <div className={styles.container_img}>
                        {photo ? (
                            <img
                                src={photo}
                                alt={`Foto de ${alias}`}
                                className={`img-fluid mb-3 ${styles.image}`}
                            />
                        ) : (
                            <img
                                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                alt={`Foto de ${alias}`}
                                className={`img-fluid mb-3 ${styles.image}`}
                            />
                        )}
                    </div>
                    <h5>{alias}</h5>
                    <p><span className={styles.content_accordion}>Descripción:</span> {description}</p>
                    <p><span className={styles.content_accordion}>Fecha de nacimiento:</span> {age}</p>
                    <p><span className={styles.content_accordion}>Dependencia:</span> {dependency}</p>
                    <p><span className={styles.content_accordion}>Localidad:</span> {location}</p>
                    <p><span className={styles.content_accordion}>Provincia:</span> {province}</p>
                    <p><span className={styles.content_accordion}>Teléfono:</span> {phone}</p>
                </div>
            </div>
        </div>
    );
};

export default AcordeonPatients;
