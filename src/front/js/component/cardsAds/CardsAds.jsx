import React, { useContext, useState, useEffect } from "react";
import styles from "./cardsAds.module.css"
import { Link } from "react-router-dom";
import profileImg from "../../../img/profileImg.png"
import { Context } from "../../store/appContext";


const CardsAds = ({ photo, title, location, date, description, link, province }) => {


  const { store, actions } = useContext(Context);

  const verMas = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className={`card ${styles.anuncio}`}>
      <div className={styles.cuadro_imagen}>
        {photo ? (
          <img
            src={photo}
            className={`card-img-top`}
            alt="Imagen del anuncio"
          />
        ) : (
          <img
            src={profileImg}
            className={`card-img-top`}
            alt="Imagen del anuncio"
          />
        )}
      </div>
      <div className={styles.card_body}>
        <h5 className={styles.card_title}>{title}</h5>
        <p className={`${styles.card_location} mt-2`}><span className="fa-solid fa-location-dot pe-1"></span>{location}, {province}</p>
        <p className={`${styles.card_date} mt-2`}><span className="fa-solid fa-calendar-days pe-1"></span><span className="pe-2 fw-bold">Fecha de inicio:</span>{date}</p>
        <p className={`${styles.card_description}`}>{description}</p>
        <div className={`d-flex justify-content-center ${styles.card_buttons}`}>
          <Link onClick={verMas} to={link} className={`btn mt-3 ${styles.boton_ver_mas}`}>
            VER MÁS
          </Link>
        </div>
      </div>
    </div>
  )
};

export default CardsAds;
