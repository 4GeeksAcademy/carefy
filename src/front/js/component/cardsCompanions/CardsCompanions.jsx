import React from 'react'
import styles from "./cardCompanions.module.css"
import { Link } from 'react-router-dom';

const CardsCompanions = ({ name, last_name, description, photo, location, province, link }) => {

  const verMas = () => {
    window.scrollTo(0, 0);
  }

  
  return (

    <div className={`card ${styles.profile}`}>
      
      <div className={styles.img_card}>
        {photo ? (
          <img
            src={photo}
            className={`card-img-top`}
            alt="Imagen del profesional"
          />
        ) : (
          <img
            src={profileImg}
            className={`card-img-top`}
            alt="Imagen del profesional"
          />
        )}
      </div>
      <div className={`${styles.card_body} p-2`}>
        <h4 className={`${styles.card_name}`}>{name} {last_name}</h4>
        <div className='d-flex justify-content-between'>
          <p className={styles.card_location}><span className="fa-solid fa-location-dot pe-1"></span>{location}, {province}</p>
        </div>
        <p className={`card-text ${styles.card_description}`}>{description}</p>
        <div className={`d-flex justify-content-center ${styles.card_buttons}`}>
          <Link onClick={verMas} to={link} className={`btn ${styles.boton_ver_mas}`}>
            VER MÁS
          </Link>
        </div>
      </div>
    </div>

  );
};

export default CardsCompanions
