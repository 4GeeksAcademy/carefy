import React from 'react'
import styles from './createAds.module.css'
import DataAds from '../../component/dataAds/DataAds.jsx'
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx'

const CreateAds = () => {
  return (
    <>
    <Jumbotron bgImg={{ backgroundImage: "url('https://images.unsplash.com/photo-1603129473525-4cd6f36fe057?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} title={"Estamos aquí para ayudarte"} subtitle={"Resolvemos cualquier duda que pueda surgirte con respecto al funcionamiento de Carefy"} />
    <div className={styles.main_container}>
        <DataAds/>
      
    </div>
    </>
  )
}

export default CreateAds
