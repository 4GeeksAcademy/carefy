import React from "react";
import styles from "./formCompanion.module.css";

const CompanionForm = () => {
  return (
    <div className={styles.container_form_companion}>
      <form className={`m-5 container`}>
        <div className="row mb-4">
          <div className="col-md-12 text-center">
            <h3 className={styles.title}>
              Forma parte de nuestra comunidad,<br />
              ¡solo necesitas unos minutos para registrarte!
            </h3>
          </div>
        </div>
    <div className={`container-fluid ${styles.form_companion}`}>
        {/* Fila 1: foto y campos básicos */}
        <div className="row mb-4">
          <div className="col-12 col-md-4">
            <div className="border p-3 bg-light text-center">
              <div className="mb-3">Foto</div>
              <input type="file" className="form-control" />
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="row g-2">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" required/>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Apellidos</label>
                <input type="text" className="form-control" id="lastName" required/>
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" required/>
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input type="tel" className="form-control" id="phone" required/>
              </div>
              <div className="col-md-6">
                <label htmlFor="dob" className="form-label">Fecha de Nacimiento</label>
                <input type="date" className="form-control" id="dob" required/>
              </div>
            </div>
          </div>
        </div>

        {/* Fila 2: Provincia y Localidad */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="province" className="form-label">Provincia</label>
            <input type="text" className="form-control" id="province" required/>
          </div>
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">Localidad</label>
            <input type="text" className="form-control" id="city" required/>
          </div>
        </div>

        {/* Fila 3: Descripción */}
        <div className="row mb-4">
          <div className="col-12">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea className="form-control" id="description" required placeholder="Háblanos un poco de ti, de tus intereses y qué te motiva a trabajar en el cuidado de personas mayores." rows="3"></textarea>
          </div>
        </div>

        {/* Fila 4: Experiencia */}
        <div className="row mb-4">
          <div className="col-12">
            <label htmlFor="experience" className="form-label">Experiencia</label>
            <textarea className="form-control" id="experience" required placeholder="Cuéntanos sobre tu experiencia previa." rows="3"></textarea>
          </div>
        </div>

        {/* Fila 5: Disponibilidad y precio */}
        <div className="row mb-4">
          <div className="col-6">
            <label className="form-label">Disponibilidad</label>
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
              <label className="form-check-label" htmlFor="interno">Interino/a</label>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="price" className="form-label">Precio Mínimo por Hora</label>
            <input type="number" className="form-control" required id="price" />
          </div>
        </div>

        {/* Fila 6: Redes Sociales */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="instagram" className="form-label">Instagram</label>
            <input type="url" className="form-control" id="instagram" />
          </div>
          <div className="col-md-6">
            <label htmlFor="linkedin" className="form-label">LinkedIn</label>
            <input type="url" className="form-control" id="linkedin" />
          </div>
          <div className="col-md-6">
            <label htmlFor="facebook" className="form-label">Facebook</label>
            <input type="url" className="form-control" id="facebook" />
          </div>
          <div className="col-md-6">
            <label htmlFor="twitter" className="form-label">Twitter</label>
            <input type="url" className="form-control" id="twitter" />
          </div>
        </div>

       
        {/* Fila 7: botones */}
        <div className="row mb-4">
          <div className="col-12 text-end">
            <button type="submit" className={ `btn btn-primary me-2 ${styles.btn_submit}`}>Enviar</button>
            <button type="button" className={`btn btn-secondary ${styles.btn_cancel}`}>Cancelar</button>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default CompanionForm;
