import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from './dataAds.module.css';

const DataAds = () => {

  const { store, actions } = useContext(Context);

  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const createAd = async (type, startDate, endDate, price, title, description, status) => {


    if (!title || !description) {
      setError("Por favor, complete título y descripción.");
      return;
    }

    await actions.createAd(type, startDate, endDate, price, title, description, status);
    navigate(`/mis-anuncios`)

  }


  return (
    <div className={`container p-4 rounded`}>

      <div className="row mt-4">
        <div className="col-12 col-md-3">
          <label htmlFor="disabledSelect" className="form-label fs-5">Tipo</label>
          <select
            id="disabledSelect"
            className="form-select"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="" disabled hidden>Seleccionar tipo de servicio</option>
            <option value="externo">Externo</option>
            <option value="interno">Interno</option>
          </select>
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label fs-5">Fecha de inicio</label>
          <input
            type="date"
            className="form-control"
            id="fechaInicio"
            name="fechaInicio"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label fs-5">Fecha de fin</label>
          <input
            type="date"
            className="form-control"
            id="fechaFin"
            name="fechaFin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label fs-5">Precio por hora</label>
          <input
            type="number"
            className="form-control"
            placeholder="0 €"
            id="precio"
            name="precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label fs-5">Título del anuncio</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label fs-5">Descripción del anuncio</label>
          <textarea className="form-control" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button onClick={() => createAd(type, startDate, endDate, price, title, description)} className={`me-2 fs-5 btn ${styles.btn_send}`}>Publicar</button>
      </div>
    </div>
  );
};

export default DataAds;
