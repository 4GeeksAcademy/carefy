import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import styles from "./cardsAds.module.css"

const CardsAds = ({ title, location, date, description }) => {
  return (
    <div className={`card ${styles.anuncio}`}>
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        className={`card-img-top ${styles.img_card}`}
        alt="Imagen del anuncio"
      />
      <div className={styles.card_body}>
        <h5 className={styles.card_title}>{title}</h5>
        <p className={styles.card_location}>{location}</p>
        <p className={styles.card_date}>{date}</p>
        <p className={styles.card_description}>{description}</p>
        <div className={styles.card_buttons}>
          <a href="#" className={styles.icon_contacto}>
            <MdOutlineEmail />
          </a>
          <a href="#" className={`btn ${styles.boton_ver_mas}`}>
            Ver más
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardsAds;
