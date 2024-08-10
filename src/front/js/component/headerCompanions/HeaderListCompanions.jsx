import React from 'react'
import styles from './headerListCompanions.module.css'

const HeaderListCompanions = () => {
    return (
        <div className={`container-fluid ${styles.header_container}`}>
        <div className={`row d-flex align-items-stretch ${styles.header}`}>
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h2 className={styles.text_header} >Encuentra a los Mejores Profesionales</h2>
            <p className={styles.text_header}>Confía en nuestra comunidad de expertos para tus necesidades.</p>
          </div>
          <div className={`col-lg-6 ${styles.img_container}`}>
            <img 
              className={`img-fluid ${styles.img_header} img-fluid rounded`} 
              alt="Un adulto y una persona mayor sentadas en un banco de un parque pasando un buen momento haciendo una videollamada" 
              title="Un adulto y una persona mayor sentadas en un banco de un parque pasando un buen momento haciendo una videollamada" 
              src="https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </div>
      </div>
      )
    }

export default HeaderListCompanions
