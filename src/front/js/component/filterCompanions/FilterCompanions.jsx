import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import styles from './filterCompanions.module.css'
import { AiOutlineFilter } from 'react-icons/ai';

const FilterCompanions = ({onFilter}) => {
  const [province, setProvince]=useState("")
  const [availability, setAvailability] = useState("")
  //const [relevancia, setRelevancia]= useState("")

  const handleSearch=()=>{
    onFilter({province, availability})
  }
  
  return (
    <div className={`container ${styles.filter_container}`}>
      
      <div className="pb-5">
        <div className={`${styles.buscador} container rounded p-2 d-flex gap-2 align-items-center flex-wrap`}>
          <div className="btn-group">
            <select value={province} onChange={(e)=>setProvince(e.target.value)} className={`btn ${styles.btn_buscador} ${styles.custom_select} btn-lg form-select`} id="provincia" defaultValue={"Ubicación"} aria-label="Selecciona la provincia">
              <option className="text-dark bg-light" value="">Ubicación</option>
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
            <select value={availability} onChange={(e)=>setAvailability(e.target.value)} className={`btn ${styles.btn_buscador} ${styles.btn_buscador_availability}  ${styles.custom_select} btn-lg form-select`} defaultValue={"Disponibilidad"} id="provincia" aria-label="Selecciona la provincia">
              <option className="text-dark bg-light" value="">Disponibilidad</option>
              <option className="text-dark bg-light" value="Horas">Horas</option>
              <option className="text-dark bg-light" value="Dias">Días</option>
              <option className="text-dark bg-light" value="Semanas">Semanas</option>
              <option className="text-dark bg-light" value="Interno">Interno</option>
            </select>
          </div>
          {/* <div className="btn-group">
          <select value={relevancia} onChange={(e)=>setRelevancia(e.target.value)} className={`btn ${styles.btn_buscador} ${styles.btn_buscador_availability}  ${styles.custom_select} btn-lg form-select`} defaultValue={"Valoración"} id="provincia" aria-label="Selecciona la provincia">
              <option className="text-dark bg-light" disabled hidden>Valoración</option>
              <option className="text-dark bg-light" value="more">Más relevantes</option>
              <option className="text-dark bg-light" value="less">Menos relevantes</option>
            </select>
          </div> */}
          <div>
            <span className="btn">
              <span className={`fa-solid fa-magnifying-glass fs-2 text-dark ${styles.lupa_buscador}`} onClick={handleSearch}></span>
              <button className={`btn ${styles.btn_buscar}`} onClick={handleSearch}>BUSCAR</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCompanions
