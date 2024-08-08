import React from 'react'
import { FaSearch } from "react-icons/fa";

const FilterCompanions = () => {
  return (
    <div className="container filtrado-contenedor">
      <div>
        <h2>Conoce a Nuestros Expertos del Cuidado</h2>
        <p>
        Aquí podrás conocer a profesionales que están listos para brindar un cuidado atento y afectuoso. Estamos aquí para asegurarnos de que tus seres queridos reciban la atención cálida y dedicada que merecen.
        </p>
      </div>
      <div className="text-center boton-filter">
        <button className="btn boton-ubicacion">Ubicación</button>
        <button className="btn boton-disponibilidad">Disponibilidad</button>
        <button className="btn boton-relevancia">Relevancia</button>
        <a href="#" className="icon-buscar">
            <FaSearch />
          </a>
      </div>
    </div>
  );
};

export default FilterCompanions
