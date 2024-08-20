import React from "react";
import styles from "./cardsAds.module.css"
import { Link } from "react-router-dom";

const CardsAds = ({photo, title, location, date, description, link }) => {

  const verMas = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className={`card ${styles.anuncio}`}>
      <div className={styles.cuadro_imagen}>
      <img
        src={photo}
        className={`card-img-top`}
        alt="Imagen del anuncio"
      />
      </div>
      <div className={styles.card_body}>
        <h5 className={styles.card_title}>{title}</h5>
        <p className={styles.card_location}><span className="fa-solid fa-location-dot pe-1"></span>{location}</p>
        <p className={styles.card_date}><span className="fa-solid fa-calendar-days pe-1"></span><span className="pe-2 fw-bold">Fecha de inicio:</span>{date}</p>
        <p className={`${styles.card_description}`}>{description}</p>
        <div className={styles.card_buttons}>
          <span className="fa-regular fa-envelope fs-3 mt-3"></span>
          <Link onClick={verMas} to={link} className={`btn ${styles.boton_ver_mas}`}>
            VER MÁS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardsAds;
