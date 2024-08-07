import React from "react";
import { MdOutlineEmail } from "react-icons/md";

const TarjetasAnuncios = ({ title, location, date, description }) => {
  return (
    <div className="card anuncio">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        className="card-img-top"
        alt="Imagen del anuncio"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{location}</p>
        <p className="card-text">{date}</p>
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

export default TarjetasAnuncios;
