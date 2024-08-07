import React from "react";
import { FaSearch } from "react-icons/fa";

const Filtrado = () => {
  return (
    <div className="container-fluid text-center filtrado-contenedor">
      <div>
        <h2>Conoce Cómo Puedes Acompañar y Apoyar a Personas Mayores</h2>
        <p>
          Navega entre nuestros anuncios y encuentra el perfil que mejor se
          ajusta a la compañía y asistencia que puedes brindar. Marca la
          diferencia en la vida de quienes buscan tu apoyo.
        </p>
      </div>
      <div>
        <button className="btn boton-ubicacion">Ubicación</button>
        <button className="btn boton-disponibilidad">Disponibilidad</button>
        <button className="btn boton-fecha">Fecha requerida</button>
        <a href="#" className="icon-buscar">
          <FaSearch />
        </a>
      </div>
    </div>
  );
};

export default Filtrado;
