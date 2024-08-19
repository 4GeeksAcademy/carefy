import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";;
import styles from './createAds.module.css';
import DataAds from '../../component/DataAds/DataAds.jsx';
import AcordeonPatients from '../../component/AcordeonPatients/AcordeonPatients.jsx';
import RadioButton from '../../component/RadioButton/RadioButton.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';

const CreateAds = () => {
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
                title={"¿Buscas un acompañante para un familiar?"}
                subtitle={"Publica un anuncio y encuentra el acompañante ideal."}
            />
            <div className={`container p-4 ${styles.main_container}`}>
                <div className={`container my-4 p-4 rounded ${styles.container_form}`}>
                    <DataAds />
                </div>
            </div>
        </>
    );
};

export default CreateAds;
