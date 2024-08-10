import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./filterAds.module.css";

const FilterAds = () => {
  return (
    <div className={`container-fluid text-center ${styles.filter_container}`}>
      <div>
        <h2>Conoce cómo puedes acompañar y apoyar a personas mayores</h2>
        <p>
          Navega entre nuestros anuncios y encuentra el perfil que mejor se
          ajusta a la compañía y asistencia que puedes brindar. Marca la
          diferencia en la vida de quienes buscan tu apoyo.
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

        <input className={styles.date} placeholder="Fecha inicio" title="Filtrar por fecha de inicio" type="date" data-bs-toggle="tooltip" />

        <a href="#" className={styles.icon_search}>
          <FaSearch />
        </a>
      </div>
    </div>



  );
};

export default FilterAds;











/*<div className=" mb-1">
<label htmlFor="ubicacion" className="form-label">Ubicación</label>
<input 
  className={`form-control ${styles.input}`}
  list="provincias" 
  id="ubicacion" 
  name="ubicacion" 
  placeholder="Escribe para buscar..." 
/>
<datalist id="provincias" className={styles.search_results}>
  <option value="Álava" />
  <option value="Albacete" />
  <option value="Alicante" />
  <option value="Almería" />
  <option value="Asturias" />
  <option value="Ávila" />
  <option value="Badajoz" />
  <option value="Barcelona" />
  <option value="Burgos" />
  <option value="Cáceres" />
  <option value="Cádiz" />
  <option value="Cantabria" />
  <option value="Castellón" />
  <option value="Ciudad Real" />
  <option value="Córdoba" />
  <option value="Cuenca" />
  <option value="Girona" />
  <option value="Granada" />
  <option value="Guadalajara" />
  <option value="Guipúzcoa" />
  <option value="Huelva" />
  <option value="Huesca" />
  <option value="Islas Baleares" />
  <option value="Jaén" />
  <option value="La Coruña" />
  <option value="La Rioja" />
  <option value="Las Palmas" />
  <option value="León" />
  <option value="Lleida" />
  <option value="Lugo" />
  <option value="Madrid" />
  <option value="Málaga" />
  <option value="Murcia" />
  <option value="Navarra" />
  <option value="Orense" />
  <option value="Palencia" />
  <option value="Pontevedra" />
  <option value="Salamanca" />
  <option value="Santa Cruz de Tenerife" />
  <option value="Segovia" />
  <option value="Sevilla" />
  <option value="Soria" />
  <option value="Tarragona" />
  <option value="Teruel" />
  <option value="Toledo" />
  <option value="Valencia" />
  <option value="Valladolid" />
  <option value="Vizcaya" />
  <option value="Zamora" />
  <option value="Zaragoza" />
</datalist>
</div>*/
