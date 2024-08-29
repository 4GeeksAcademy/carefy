import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from "./EditarAnuncio.module.css"
import RadioButton from "../RadioButton/RadioButton.jsx";
import AcordeonPatients from "../AcordeonPatients/AcordeonPatients.jsx";

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
  const [selectedPatient, setSelectedPatient] = useState('');

  const hoy = new Date().toISOString().split('T')[0];

  const navigate = useNavigate();

  useEffect(() => {
    if (store.singleAd) {
      setType(store.singleAd.type || '');

      // Formatear las fechas al formato 'yyyy-MM-dd'
      const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
      };

      setStartDate(formatDate(store.singleAd.start_date) || '');
      setEndDate(formatDate(store.singleAd.end_date) || '');
      setPrice(store.singleAd.max_cost || '');
      setTitle(store.singleAd.title || '');
      setDescription(store.singleAd.description || '');
      setAdId(store.singleAd.id);
      setSelectedPatient(store.singleAd.patient_id || ''); // Inicializa el paciente seleccionado
    } else {
      console.error('No ad selected or adElegido is null');
    }
  }, [store.singleAd]);

  const [error, setError] = useState(null);

  const handleChangeType = (e) => setType(e.target.value);
  const handleChangeStartDate = (e) => setStartDate(e.target.value);
  const handleChangeEndDate = (e) => setEndDate(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);

  const handleEdit = async () => {

    if (!title || !description || !selectedPatient || !startDate) {
      setError("Por favor, seleccione una persona, complete la fecha de inicio, título y descripción.");
      return;
    }
    if (endDate && startDate > endDate) {
      setError("La fecha de fin no puede ser menor a la de inicio.");
      return;
    }

    const finalEndDate = endDate || "4000-01-01";

    await actions.editAd(adId, type, startDate, finalEndDate, price, title, description, selectedPatient);
      navigate('/mis-anuncios')
    


  }

  useEffect(() => {
    actions.getFamiliarDetalles();
    actions.getSingleAd(store.singleAd.id);
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
            alias={patient.alias}
            photo={patient.photo}
            description={patient.description}
            age={getAge(patient.birthdate)}
            birthdate={new Date(patient.birthdate).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
            dependency={patient.dependency}
            province={patient.province}
            phone={patient.phone}
            location={patient.location}
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
            min={hoy}
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
            min={hoy}
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
      <div className="d-flex justify-content-end align-items-start mt-4 gap-5">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <button onClick={() => handleEdit(adId, type, startDate, endDate, price, title, description)} className={`${styles.btn_publicar} me-2 fs-5 btn`}>Publicar</button>
      </div>
    </div>
  );
};
