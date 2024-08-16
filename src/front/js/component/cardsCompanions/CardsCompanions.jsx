import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import styles from "./cardCompanions.module.css"

const CardsCompanions= ({ name, last_name, ratings, description, photo, location}) => {
  return (
  
    <div className={`card ${styles.profile}`}>
      <img 
        src={photo} 
        className={`card-img-top ${styles.img_card}`}
        alt="persona profesional del cuidado de personas mayores" 
        title="persona profesional del cuidado de personas mayores"
      />
      <div className={styles.card_body}>
        <h5 className={styles.card_name}>{name} {last_name}</h5>
        <p className={styles.card_location}>{location}</p>
        <p className={styles.card_ratings}>{ratings}</p>
        <p className={`card-text ${styles.card_description}`}>{description}</p>
        <div className={styles.card_buttons}>
          <a href="#" className={styles.icon_contacto}>
            <MdOutlineEmail />
          </a>
          <a href="#" className={`btn ${styles.btn_see_more}`}>
            Ver más
          </a>
        </div>
      </div>
    </div>
    
  );
};

export default CardsCompanions
