import React from "react";
import styles from "./formCompanion.module.css";

const CompanionForm = () => {
  return (
    <div className={styles.container_form_companion}>
      <form className={`m-5 container`}>

        <div className={`container-fluid p-4 ${styles.form_companion}`}>
          {/* Fila 1: foto y campos básicos */}
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="input-group mb-4">
                <label className="fs-5 mt-1 pe-3" for="inputGroupFile01">Foto de perfil</label>
                <input type="file" className="form-control  rounded" id="inputGroupFile01" />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-4">
              <label htmlFor="name" className="form-label fs-5">Nombre</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label fs-5">Apellidos</label>
              <input type="text" className="form-control" id="lastName" required />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label fs-5">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-3">
              <label htmlFor="phone" className="form-label fs-5">Teléfono</label>
              <input type="tel" className="form-control" id="phone" required />
            </div>
            <div className="col-md-3">
              <label htmlFor="dob" className="form-label fs-5">Fecha de Nacimiento</label>
              <input type="date" className="form-control" id="dob" required />
            </div>
            <div className="col-md-3">
              <label htmlFor="province" className="form-label fs-5">Provincia</label>
              <input type="text" className="form-control" id="province" required />
            </div>
            <div className="col-md-3">
              <label htmlFor="city" className="form-label fs-5">Localidad</label>
              <input type="text" className="form-control" id="city" required />
            </div>
          </div>

          {/* Fila 3: Descripción */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="description" className="form-label fs-5">Descripción</label>
              <textarea className="form-control" id="description" required placeholder="Háblanos un poco de ti, de tus intereses y qué te motiva a trabajar en el cuidado de personas mayores." rows="3"></textarea>
            </div>
          </div>

          {/* Fila 4: Experiencia */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="experience" className="form-label fs-5">Experiencia</label>
              <textarea className="form-control" id="experience" required placeholder="Cuéntanos sobre tu experiencia previa." rows="3"></textarea>
            </div>
          </div>

          {/* Fila 5: Disponibilidad y precio */}
          <div className="row mb-4">
            <div className="col-6">
              <label className="form-label fs-5">Disponibilidad</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="hours" />
                <label className="form-check-label" htmlFor="hours">Horas</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="days" />
                <label className="form-check-label" htmlFor="days">Días</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="weeks" />
                <label className="form-check-label" htmlFor="weeks">Semanas</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="interno" />
                <label className="form-check-label" htmlFor="interno">Interno/a</label>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label fs-5">Precio (hora)</label>
              <input type="number" className="form-control" required id="price" placeholder="€" />
            </div>
          </div>

          {/* Fila 6: Redes Sociales */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="instagram" className="form-label fs-5">Instagram</label>
              <input type="url" className="form-control" id="instagram" />
            </div>
            <div className="col-md-6">
              <label htmlFor="linkedin" className="form-label fs-5">LinkedIn</label>
              <input type="url" className="form-control" id="linkedin" />
            </div>
            <div className="col-md-6">
              <label htmlFor="facebook" className="form-label fs-5">Facebook</label>
              <input type="url" className="form-control" id="facebook" />
            </div>
            <div className="col-md-6">
              <label htmlFor="twitter" className="form-label fs-5">Twitter</label>
              <input type="url" className="form-control" id="twitter" />
            </div>
          </div>


          {/* Fila 7: botones */}
          <div className="row mb-4">
            <div className="col-12 text-end">
              <button type="submit" className={`btn btn-primary fs-5 me-2 ${styles.btn_submit}`}>Guardar</button>
            </div>
          </div>
        </div>
      </form >
    </div >
  );
};

export default CompanionForm;
