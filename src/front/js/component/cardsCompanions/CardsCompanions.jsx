import React from 'react'
import styles from "./cardCompanions.module.css"
import { Link } from 'react-router-dom';

const CardsCompanions = ({ name, last_name, ratings, description, photo, location }) => {
  return (

    <div className={`card ${styles.profile}`}>
      <img
        src={photo}
        className={`card-img-top ${styles.img_card}`}
        alt="persona profesional del cuidado de personas mayores"
        title="persona profesional del cuidado de personas mayores"
      />
      <div className={`${styles.card_body} p-2`}>
        <h4 className={`${styles.card_name}`}>{name} {last_name}</h4>
        <div className='d-flex justify-content-between'>
          <p className={styles.card_location}><span className="fa-solid fa-location-dot pe-1"></span>{location}</p>
          <p className={styles.card_ratings}><span class="fa-solid fa-star pe-1"></span>{ratings}</p>
        </div>
        <p className={`card-text ${styles.card_description}`}>{description}</p>
        <div className={styles.card_buttons}>
          <span class="fa-regular fa-envelope fs-3 mt-3"></span>
          <Link to="#" className={`btn ${styles.boton_ver_mas}`}>
            VER MÁS
          </Link>
        </div>
      </div>
    </div>

  );
};

export default CardsCompanions
