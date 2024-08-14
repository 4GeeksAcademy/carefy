import React from 'react'
import styles from './createAds.module.css'
import DataAds from '../../component/dataAds/DataAds.jsx'
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx'


const CreateAds = () => {
  return (
    <>
     <Jumbotron bgImg={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2024/03/22/13/15/holding-hands-8649669_640.jpg')" }} title={"Publicar un anuncio"} subtitle={"Selecciona el paciente a cuidar:"} />
    <div className={styles.main_container}>
      
        <DataAds/>
      
    </div>
    </>
  )
}

export default CreateAds
