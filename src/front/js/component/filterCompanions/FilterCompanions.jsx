import React from 'react'
import { FaSearch } from "react-icons/fa";
import styles from './filterCompanions.module.css'

const FilterCompanions = () => {
  return (
    <div className={`container ${styles.filter_container}`}>
      <div>
        <h2>Conoce a Nuestros Expertos del Cuidado</h2>
        <p>
        Aquí podrás conocer a profesionales que están listos para brindar un cuidado atento y afectuoso. Estamos aquí para asegurarnos de que tus seres queridos reciban la atención cálida y dedicada que merecen.
        </p>
      </div>
      <div className={`${styles.btn_filters} container-fluid text-center`}>
        <select className={`form-control ${styles.location}`}>
          <option>Ubicación</option>
          <option>Álava</option>
          <option>Albacete</option>
          <option>Alicante</option>
        </select>

        <select className={`form-control ${styles.availability}`}>
          <option>Disponibilidad</option>
          <option>Por horas</option>
          <option>Por días</option>
          <option>Por semanas</option>
          <option>Interno/a</option>
        </select>

        <select className={`form-control ${styles.rating}`}>
          <option>Valoración</option>
          <option>Más destacados</option>
          <option>Menos destacados</option>
        </select>


        <a href="#" className={styles.icon_search}>
          <FaSearch />
        </a>
      </div>
    </div>
  );
};

export default FilterCompanions
