import React from "react";
import styles from './patientSelector.module.css';

const PatientSelector = ({ patients, selectedPatient, onSelect }) => {
    return (
        <>
            {/* Radio buttons para seleccionar el paciente */}
            <div className="mb-3 d-flex gap-5 fs-5">
                {/* Mapeamos los pacientes que el familiar tiene añadidos para generar los inputs tipo radio */}
                {patients.map((patient, index) => {
                    //si el usuario introduce el alias con espacios los vamos a reemplazar por guiones
                    //"\s" hace referencia al espacio y el "+"  es para buscar uno o mas ocurrencias 
                    const changeSpaces = patient.alias.replace(/\s+/g, '_');
                    return (
                        <div key={index} className="form-check">
                            <input
                                type="radio"
                                id={`patient-${changeSpaces}`}
                                name="patient"
                                /* el valor del input será el alías del paciente, cada valor será diferente ya que cada paciente tendrá su alias */
                                value={changeSpaces}
                                /* verificamos si el paciente actualmente seleccionado es igual al alias del paciente, si es así, se marcará como seleccionado que es un checked. Es para asegurar que visualmente se vea marcado*/
                                checked={selectedPatient === changeSpaces}
                                /* con el evento que se ejecuta al hacer clic en el input estamos cambiando el contenido del useState selectedPatient pasandole como argumento el alias del paciente  */
                                onChange={() => onSelect(changeSpaces)}
                                className="form-check-input"
                            />
                            <label htmlFor={`patient-${changeSpaces}`} className="form-check-label">
                                {patient.alias}
                            </label>
                        </div>
                    );
                })}
                <div className="form-check">
                    {/*Este es el input "todos" que es para seleccionar a todos los pacientes*/}
                    <input
                        type="radio"
                        id="patient-all"
                        name="patient"
                        value="all"
                        checked={selectedPatient === "all"}
                        onChange={() => onSelect("all")}
                        className="form-check-input"
                    />
                    <label htmlFor="patient-all" className="form-check-label">
                        Todos
                    </label>
                </div>
            </div>

            {/* Al seleccionar la opcion TODOS, si la variable pacientes tiene datos añadido y el useState contiene el valor all, crea un mapeo de los pacientes para generar los diferentes acordeones */}
            {patients.length > 0 && (
                <div className="accordion mt-4" id="patientAccordion">
                    {selectedPatient === "all"
                        ? patients.map((patient) => {
                            //si el usuario introduce el alias con espacios los vamos a reemplazar por guiones
                            //"\s" hace referencia al espacio y el "+"  es para buscar uno o mas ocurrencias 
                            const changeSpaces = patient.alias.replace(/\s+/g, '_');
                            return (
                                <div className="accordion-item" key={changeSpaces}>
                                    <h2 className="accordion-header">
                                        <button
                                            className={`accordion-button collapsed ${styles.btn_accordion}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${changeSpaces}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse-${changeSpaces}`}
                                        >
                                            {patient.alias}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse-${changeSpaces}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#patientAccordion"
                                    >
                                        <div className="accordion-body">
                                            <div className={styles.container_img}>
                                                {/* si el usuario NO aporta foto del paciente asignamos una foto avatar generica */}
                                                {patient.photo ? (
                                                    <img
                                                        src={patient.photo}
                                                        alt={`Foto de ${patient.alias}`}
                                                        className={`img-fluid mb-3 ${styles.image}`}
                                                    />
                                                ) : (
                                                    <img
                                                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                                        alt={`Foto de ${patient.alias}`}
                                                        className={`img-fluid mb-3 ${styles.image}`}
                                                    />
                                                )}
                                            </div>
                                            <h5>{patient.name} {patient.lastName}</h5>
                                            <p><span className={styles.content_accordion}>Descripción:</span> {patient.description}</p>
                                            <p><span className={styles.content_accordion}>Edad:</span> {patient.age}</p>
                                            <p><span className={styles.content_accordion}>Dependencia:</span> {patient.dependency}</p>
                                            <p><span className={styles.content_accordion}>Localidad:</span> {patient.location}</p>
                                            <p><span className={styles.content_accordion}>Provincia:</span> {patient.province}</p>
                                            <p><span className={styles.content_accordion}>Teléfono:</span> {patient.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        // AL seleccionar un paciente, filtramos por el alias para después crear el mapeo del resultado del filter
                        : patients
                            //filtro cambiando espacios por guiones bajos
                            .filter(patient => patient.alias.replace(/\s+/g, '_') === selectedPatient)
                            .map((patient) => {
                                //si el usuario introduce el alias con espacios los vamos a reemplazar por guiones
                                //"\s" hace referencia al espacio y el "+"  es para buscar uno o mas ocurrencias 
                                const changeSpaces = patient.alias.replace(/\s+/g, '_');
                                return (
                                    <div className="accordion-item" key={changeSpaces}>
                                        <h2 className="accordion-header">
                                            <button
                                                className={`accordion-button collapsed ${styles.btn_accordion}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse-${changeSpaces}`}
                                                aria-expanded="true"
                                                aria-controls={`collapse-${changeSpaces}`}
                                            >
                                                {patient.alias}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse-${changeSpaces}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#patientAccordion"
                                        >
                                            <div className="accordion-body">
                                                <div className={styles.container_img}>
                                                    {patient.photo ? (
                                                        <img
                                                            src={patient.photo}
                                                            alt={`Foto de ${patient.alias}`}
                                                            className={`img-fluid mb-3 ${styles.image}`}
                                                        />
                                                    ) : (
                                                        <img
                                                            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                                                            alt={`Foto de ${patient.alias}`}
                                                            className={`img-fluid mb-3 ${styles.image}`}
                                                        />
                                                    )}
                                                </div>
                                                <h5>{patient.name} {patient.lastName}</h5>
                                                <p><span className={styles.content_accordion}>Descripción:</span> {patient.description}</p>
                                                <p><span className={styles.content_accordion}>Edad:</span> {patient.age}</p>
                                                <p><span className={styles.content_accordion}>Dependencia:</span> {patient.dependency}</p>
                                                <p><span className={styles.content_accordion}>Localidad:</span> {patient.location}</p>
                                                <p><span className={styles.content_accordion}>Provincia:</span> {patient.province}</p>
                                                <p><span className={styles.content_accordion}>Teléfono:</span> {patient.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            )}
        </>
    );
};

export default PatientSelector;
