import React from "react";
import styles from "./Buscador.module.css"

export const Buscador = ({location, availability, serviceType}) => {
  return (
    <div className={`p-5 bg-body-tertiary text-center ${styles.jumbotron}`}>
      <div className={styles.jumbotron_content_edit}>
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Nos preocupamos de verdad por el cuidado de tu familia</h1>
          <p className="col fs-4 text-center">¿Buscas acompañante? ¿Buscas cuidar a alguien? En Carefy podrás encontrar la mejor opción.</p>
        </div>
        <div className="pb-5">
          <div className={`${styles.buscador} container rounded p-2 d-flex gap-2 align-items-center flex-wrap`}>
            <div className="btn-group">
              <button type="button" className={`btn ${styles.btn_buscador} btn-lg fs-4 dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                Ubicación
              </button>
              <ul className="dropdown-menu">
                <li><a className={`dropdown-item ${styles.dropdown_item_edit}`} href="#">{location}</a></li>
              </ul>
            </div>
            <div className="btn-group">
              <button type="button" className={`btn ${styles.btn_buscador} btn-lg fs-4 dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                Disponibilidad
              </button>
              <ul className="dropdown-menu">
                <li><a className={`dropdown-item ${styles.dropdown_item_edit}`} href="#">{availability}</a></li>
              </ul>
            </div>
            <div className="btn-group">
              <button type="button" className={`btn ${styles.btn_buscador} btn-lg fs-4 dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                ¿Qué buscas?
              </button>
              <ul className="dropdown-menu">
                <li><a className={`dropdown-item ${styles.dropdown_item_edit}`} href="#">{serviceType}</a></li>
              </ul>
            </div>
            <div>
              <button className="btn">
                <span className="fa-solid fa-magnifying-glass fs-2 text-dark"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}