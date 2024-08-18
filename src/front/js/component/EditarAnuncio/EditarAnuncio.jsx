import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const EditarAnuncio = () => {

  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [adId, setAdId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (store.adElegido) {
        setType(store.adElegido.type || '');
        setStartDate(store.adElegido.start_date || '');
        setEndDate(store.adElegido.end_date || '');
        setPrice(store.adElegido.max_cost || '');
        setTitle(store.adElegido.title || '');
        setDescription(store.adElegido.description || '');
        setAdId(store.adElegido.id);
    } else {
        console.error('No ad selected or adElegido is null');
    }
}, [store.adElegido]);

  const [error, setError] = useState(null);

  const handleChangeType = (e) => setType(e.target.value);
  const handleChangeStartDate = (e) => setStartDate(e.target.value);
  const handleChangeEndDate = (e) => setEndDate(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);

  const handleEdit = async () => {
      await actions.editAd(adId, type, startDate, endDate, price, title, description);
      navigate("/mis-anuncios");
  };


  return (
    <div className={`container p-4 rounded`}>

      <div className="row mt-4">
        <div className="col-12 col-md-3">
          <label htmlFor="disabledSelect" className="form-label fs-5">Tipo</label>
          <select
            id="disabledSelect"
            className="form-select"
            onChange={handleChangeType}
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
            onChange={handleChangeStartDate}
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
            onChange={handleChangeEndDate}
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
            onChange={handleChangePrice}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label fs-5">Título del anuncio</label>
          <input type="text" className="form-control" value={title} onChange={handleChangeTitle} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <label className="form-label fs-5">Descripción del anuncio</label>
          <textarea className="form-control" rows={4} value={description} onChange={handleChangeDescription}></textarea>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button onClick={() => handleEdit(adId, type, startDate, endDate, price, title, description)} className={`me-2 fs-5 btn`}>Publicar</button>
      </div>
    </div>
  );
};
