import React, { useState } from "react";



import styles from './dataAds.module.css';


const DataAds = () => {
  

 

  return (
    <div className={`container my-5 p-4 rounded`}>
      

      <div className="row mt-4">
        <div className="col-12 col-md-4">
          <label htmlFor="fechaInico" className="form-label">Fecha de inicio</label>
          <input
            type="date"
            className="form-control"
            id="fechaInicio"
            name="fechaInicio"
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="fechaFin" className="form-label">Fecha de fin</label>
          <input
            type="date"
            className="form-control"
            id="fechaFin"
            name="fechaFin"
            
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="precio" className="form-label">Precio por hora</label>
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
          <label className="form-label">Título del anuncio</label>
          <input type="text" className="form-control" />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label">Descripción del anuncio</label>
          <textarea className="form-control" rows={4}></textarea>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button className={`me-2 btn ${styles.btn_send}`}>Publicar</button>
        <button className={`btn ${styles.btn_cancel}`}>Cancelar</button>
      </div>
    </div>
  );
};

export default DataAds;
