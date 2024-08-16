import React, { useState } from "react";



import styles from './dataAds.module.css';


const DataAds = () => {
  

 

  return (
    <div className={`container p-4 rounded`}>

      <div className="row mt-4">
        <div className="col-12 col-md-4">
          <label className="form-label fs-5">Fecha de inicio</label>
          <input
            type="date"
            className="form-control"
            id="fechaInicio"
            name="fechaInicio"
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label fs-5">Fecha de fin</label>
          <input
            type="date"
            className="form-control"
            id="fechaFin"
            name="fechaFin"
            
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label fs-5">Precio por hora</label>
          <input
            type="number"
            className="form-control"
            placeholder="Precio por hora (€)"
            id="precio"
            name="precio"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label fs-5">Título del anuncio</label>
          <input type="text" className="form-control" />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label fs-5">Descripción del anuncio</label>
          <textarea className="form-control" rows={4}></textarea>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className={`me-2 fs-5 btn ${styles.btn_send}`}>Publicar</button>
        <button className={`btn fs-5 ${styles.btn_cancel}`}>Cancelar</button>
      </div>
    </div>
  );
};

export default DataAds;
