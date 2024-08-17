import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./filterAds.module.css";

const FilterAds = () => {
  return (
    <div className={`container-fluid text-center ${styles.filter_container}`}>

      <div className="pb-5">
        <div className={`${styles.buscador} container rounded p-2 d-flex gap-2 align-items-center flex-wrap`}>
          <div className="btn-group">
            <select className={`btn ${styles.btn_buscador} ${styles.custom_select} btn-lg form-select`} id="provincia" defaultValue={"Ubicación"} aria-label="Selecciona la provincia">
              <option className="text-dark bg-light" disabled hidden>Ubicación</option>
              <option className="text-dark bg-light" value="A Coruna">A Coruña</option>
              <option className="text-dark bg-light" value="Alava">Álava</option>
              <option className="text-dark bg-light" value="Albacete">Albacete</option>
              <option className="text-dark bg-light" value="Alicante">Alicante</option>
              <option className="text-dark bg-light" value="Almeria">Almería</option>
              <option className="text-dark bg-light" value="Asturias">Asturias</option>
              <option className="text-dark bg-light" value="Avila">Ávila</option>
              <option className="text-dark bg-light" value="Badajoz">Badajoz</option>
              <option className="text-dark bg-light" value="Baleares">Baleares</option>
              <option className="text-dark bg-light" value="Barcelona">Barcelona</option>
              <option className="text-dark bg-light" value="Burgos">Burgos</option>
              <option className="text-dark bg-light" value="Caceres">Cáceres</option>
              <option className="text-dark bg-light" value="Cadiz">Cádiz</option>
              <option className="text-dark bg-light" value="Cantabria">Cantabria</option>
              <option className="text-dark bg-light" value="Castellon">Castellón</option>
              <option className="text-dark bg-light" value="Ciudad Real">Ciudad Real</option>
              <option className="text-dark bg-light" value="Cordoba">Córdoba</option>
              <option className="text-dark bg-light" value="Cuenca">Cuenca</option>
              <option className="text-dark bg-light" value="Girona">Girona</option>
              <option className="text-dark bg-light" value="Granada">Granada</option>
              <option className="text-dark bg-light" value="Guadalajara">Guadalajara</option>
              <option className="text-dark bg-light" value="Guipuzcoa">Guipúzcoa</option>
              <option className="text-dark bg-light" value="Huelva">Huelva</option>
              <option className="text-dark bg-light" value="Huesca">Huesca</option>
              <option className="text-dark bg-light" value="Jaen">Jaén</option>
              <option className="text-dark bg-light" value="La Rioja">La Rioja</option>
              <option className="text-dark bg-light" value="Las Palmas">Las Palmas</option>
              <option className="text-dark bg-light" value="Leon">León</option>
              <option className="text-dark bg-light" value="Lleida">Lleida</option>
              <option className="text-dark bg-light" value="Lugo">Lugo</option>
              <option className="text-dark bg-light" value="Madrid">Madrid</option>
              <option className="text-dark bg-light" value="Malaga">Málaga</option>
              <option className="text-dark bg-light" value="Murcia">Murcia</option>
              <option className="text-dark bg-light" value="Navarra">Navarra</option>
              <option className="text-dark bg-light" value="Ourense">Ourense</option>
              <option className="text-dark bg-light" value="Palencia">Palencia</option>
              <option className="text-dark bg-light" value="Pontevedra">Pontevedra</option>
              <option className="text-dark bg-light" value="Salamanca">Salamanca</option>
              <option className="text-dark bg-light" value="Segovia">Segovia</option>
              <option className="text-dark bg-light" value="Sevilla">Sevilla</option>
              <option className="text-dark bg-light" value="Soria">Soria</option>
              <option className="text-dark bg-light" value="Tarragona">Tarragona</option>
              <option className="text-dark bg-light" value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
              <option className="text-dark bg-light" value="Teruel">Teruel</option>
              <option className="text-dark bg-light" value="Toledo">Toledo</option>
              <option className="text-dark bg-light" value="Valencia">Valencia</option>
              <option className="text-dark bg-light" value="Valladolid">Valladolid</option>
              <option className="text-dark bg-light" value="Vizcaya">Vizcaya</option>
              <option className="text-dark bg-light" value="Zamora">Zamora</option>
              <option className="text-dark bg-light" value="Zaragoza">Zaragoza</option>
              <option className="text-dark bg-light" value="Ceuta">Ceuta</option>
              <option className="text-dark bg-light" value="Melilla">Melilla</option>
            </select>
          </div>
          <div className="btn-group">
            <select className={`btn ${styles.btn_buscador} ${styles.btn_buscador_availability}  ${styles.custom_select} btn-lg form-select`} defaultValue={"Disponibilidad"} id="provincia" aria-label="Selecciona la provincia">
              <option className="text-dark bg-light" disabled hidden>Disponibilidad</option>
              <option className="text-dark bg-light" value="hours">Por horas</option>
              <option className="text-dark bg-light" value="intern">Interno</option>
              <option className="text-dark bg-light" value="day">Por día</option>
            </select>
          </div>
          <div className="btn-group">
            <input type="date" className={`btn ${styles.btn_buscador} ${styles.btn_buscador_companion} ${styles.custom_select} btn-lg form-select`} />

          </div>
          <div>
            <span className="btn">
              <span className={`fa-solid fa-magnifying-glass fs-2 text-dark ${styles.lupa_buscador}`}></span>
              <button className={`btn ${styles.btn_buscar}`}>BUSCAR</button>
            </span>
          </div>
        </div>
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
