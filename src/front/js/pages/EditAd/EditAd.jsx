import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";;
import { EditarAnuncio } from '../../component/EditarAnuncio/EditarAnuncio.jsx';
import styles from "./EditAd.module.css"
import AcordeonPatients from '../../component/AcordeonPatients/AcordeonPatients.jsx';
import RadioButton from '../../component/RadioButton/RadioButton.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';

export const EditAd = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    useEffect(() => {
        if (!store.userData.token) {
          navigate('/login');
        }
      }, [store.userData.token, navigate])


    return (
        <>
            <Jumbotron
                bgImg={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2024/03/22/13/15/holding-hands-8649669_640.jpg')" }}
                title={"Edita tu anuncio y publica las actualizaciones"}
                subtitle={"No te preocupes, si te has equivocado desde aquí lo puedes modificar."}
            />
            <div className={`${styles.container_edit} container bg-light my-5 rounded`}>
                <div className={`container my-4 rounded`}>
     

                        <div className="accordion mt-4" id="patientAccordion">
                            {patients
                                .filter(patient => selectedPatient === "all" || patient.alias.replace(/\s+/g, '_') === selectedPatient)
                                .map((patient, index) => (
                                    <AcordeonPatients
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

                    <EditarAnuncio />
                </div>
            </div>
        </>
    );
};