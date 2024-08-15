import React, { useState, useEffect } from 'react';
import styles from './createAds.module.css';
import DataAds from '../../component/dataAds/DataAds.jsx';
import Carrousel from '../../component/carrousel/Carrousel.jsx';
import RadioButton from '../../component/radioButton/RadioButton.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';

const CreateAds = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');


    return (
        <>
            <Jumbotron
                bgImg={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2024/03/22/13/15/holding-hands-8649669_640.jpg')" }}
                title={"Publicar un anuncio"}
                subtitle={"Selecciona el paciente a cuidar:"}
            />
            <div className={`container my-5 p-4 rounded ${styles.main_container}`}>
                <div className={styles.container_form}>
                    <div className={`container my-5 p-4 rounded ${styles.container_form}`}>
                        <div className="mb-3 container-fluid">
                            {/* RadioButton para la opción "Todos" */}
                            <RadioButton
                                alias="Todos"
                                value="all"
                                checked={selectedPatient === "all"}
                                onChange={() => setSelectedPatient("all")}
                            />

                            {/* Mapea los pacientes que el usuario tenga registrados */}
                            {patients.map((patient, index) => (
                                <RadioButton
                                    key={index}
                                    alias={patient.alias}
                                    value={patient.alias.replace(/\s+/g, '_')}
                                    checked={selectedPatient === patient.alias.replace(/\s+/g, '_')}
                                    onChange={() => setSelectedPatient(patient.alias.replace(/\s+/g, '_'))}
                                />
                            ))}
                        </div>

                        <div className="accordion mt-4" id="patientAccordion">
                            {patients
                                .filter(patient => selectedPatient === "all" || patient.alias.replace(/\s+/g, '_') === selectedPatient)
                                .map((patient, index) => (
                                    <Carrousel
                                        key={index}
                                        alias={patient.alias}
                                        photo={patient.photo}
                                        description={patient.description}
                                        age={patient.age}
                                        dependency={patient.dependency}
                                        province={patient.province}
                                        phone={patient.phone}
                                        location={patient.location}
                                    />
                                ))}
                        </div>

                        <DataAds />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateAds;
