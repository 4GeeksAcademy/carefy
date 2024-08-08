import React from 'react'
import { MdOutlineEmail } from "react-icons/md";

const CardsCompanions= ({ name, last_name, ratings, description, photo, location}) => {
  return (
    <div className="card perfil">
      <img 
        src={photo} 
        className="card-img-top" 
        alt="persona profesional del cuidado de personas mayores" 
        title="persona profesional del cuidado de personas mayores"
      />
      <div className="card-body">
        <h5 className="card-name">{name} {last_name}</h5>
        <p className="card-location">{location}</p>
        <p className="card-ratings">{ratings}</p>
        <p className="card-text card-description">{description}</p>
        <div className="card-buttons">
          <a href="#" className="icon-contacto">
            <MdOutlineEmail />
          </a>
          <a href="#" className="btn boton-ver-mas">
            VER MÁS
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardsCompanions
