import React, { useState } from "react";

import PatientSelector from "../patientSelector/PatientSelector.jsx";

import styles from './dataAds.module.css';


const DataAds = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");

  // Ejemplo de pacientes
  const patients = [
    {
      alias: "Papá 1",
      name: "Juan",
      lastName: "Pérez",
      photo: "https://randomuser.me/api/portraits/men/75.jpg",
      description: "Descripción del paciente 1",
      age: 30,
      dependency: "Dependencia alta",
      location: "Madrid",
      province: "Madrid",
      phone: "123456789"
    },
    {
      alias: "Mamá",
      name: "Andrea",
      lastName: "Pérez",
      photo: null,
      description: "Descripción del paciente 2",
      age: 65,
      dependency: "Dependencia media",
      location: "Madrid",
      province: "Madrid",
      phone: "987654321"
    }
  ];

  return (
    <div className={`container my-5 p-4 rounded ${styles.container_form}`}>
      

      <PatientSelector
        patients={patients}
        selectedPatient={selectedPatient}
        onSelect={setSelectedPatient}
      />

      <div className="row mt-4">
        <div className="col-12 col-md-4">
          <label className="form-label">Fecha de inicio</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label">Fecha de fin</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label">Precio por hora</label>
          <input
            type="number"
            className="form-control"
            placeholder="Precio por hora (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
