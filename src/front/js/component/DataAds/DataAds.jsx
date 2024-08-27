import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from './dataAds.module.css';
import RadioButton from "../RadioButton/RadioButton.jsx";
import AcordeonPatients from "../AcordeonPatients/AcordeonPatients.jsx";

const DataAds = () => {

  const { store, actions } = useContext(Context);

  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);



  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const hoy = new Date().toISOString().split('T')[0];


  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  }

  const handleEndDataChange = (event) => {
    const selectedEndDate = event.target.value;
    setEndDate(selectedEndDate)

    if (selectedEndDate && (selectedEndDate < startDate)) {
      setTooltipVisible(true)
    }else {
      setTooltipVisible(false)
    }
  }

  const handlePriceChange = (event) =>{
    if (endDate && endDate < startDate) {
      setTooltipVisible(false);
      setPrice(event.target.value);
    }
  }


  const createAd = async () => {
    if (!title || !description || !selectedPatient) {
      setError("Por favor, seleccione una persona, complete el título y la descripción.");
      return;
    }
    if (startDate > endDate) {
      setError("La fecha de fin no puede ser menor a la de inicio.");
      return;
    }

    await actions.createAd(type, startDate, endDate, price, title, description, selectedPatient);
    navigate(`/mis-anuncios`)

  }

  useEffect(() => {
    actions.getFamiliarDetalles();
  }, []);

  const getAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  function capitalizeFirstLetter(string) {
    if (string.length === 0) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }


  return (
    <div className={`container p-4 rounded`}>
      <div>
        <p className='fs-5 fw-bold'>Selecciona el usuario al que deseas buscar un acompañante</p>
      </div>
      <div className="mb-3 container-fluid d-flex gap-5">

        {store.familiares
          .map((familiar, index) => (
            <RadioButton
              key={index}
              alias={capitalizeFirstLetter(familiar.alias)}
              value={familiar.id}
              checked={selectedPatient === familiar.id}
              onChange={() => setSelectedPatient(familiar.id)}
            />
          ))}


      </div>

      <div className="accordion mt-4" id="patientAccordion">
        {store.familiares.map((patient, index) => (
          <AcordeonPatients
            key={index}
            alias={capitalizeFirstLetter(patient.alias)}
            photo={patient.photo}
            description={patient.description}
            age={getAge(patient.birthdate)}
            dependency={patient.dependency}
            province={patient.province}
            phone={patient.phone}
            location={patient.location}
            birthdate={new Date(patient.birthdate).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
            firstName={patient.name}
            lastName={patient.lastname}
          />
        ))}
      </div>

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
            min={hoy}
            value={startDate}
            onChange={handleDateChange} 
          />
          {/* {tooltipVisible && (
            <div style={{ color: 'red', marginTop: '5px' }}>
              <p>La fecha no puede ser anterior a la fecha actual.</p>
            </div>
          )} */}

        </div>
        <div className="col-12 col-md-3">
          <label className="form-label fs-5">Fecha de fin</label>
          <input
            type="date"
            className="form-control"
            id="fechaFin"
            min={hoy}
            name="fechaFin"
            value={endDate}
            // onChange={(e) => setEndDate(e.target.value)}
            onChange={handleEndDataChange} 
          />
           {tooltipVisible && (
            <div style={{ color: 'red', marginTop: '5px' }}>
              <p>La fecha de fin no puede ser anterior a la fecha de inicio.</p>
            </div>
          )}
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

      <div className="d-flex justify-content-end align-items-start mt-4 gap-5">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <button onClick={createAd} className={`me-2 fs-5 btn ${styles.btn_send}`}>Publicar</button>
      </div>
    </div>
  );
};

export default DataAds;
