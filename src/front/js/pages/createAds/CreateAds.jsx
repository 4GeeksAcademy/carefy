import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import styles from './createAds.module.css'
import DataAds from '../../component/dataAds/DataAds.jsx'


const CreateAds = () => {

  const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/login');
        }
    }, [store.token, navigate])

  return (
    <div className={styles.main_container}>
        <DataAds/>
      
    </div>
  )
}

export default CreateAds
