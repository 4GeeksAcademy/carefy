import React from "react";
import "./Buscador.css"

export const Buscador = () => {
  return (
    <div className="p-5 bg-body-tertiary text-center jumbotron">
      <div className="jumbotron-content">
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Nos preocupamos de verdad por el cuidado de tu familia</h1>
          <p className="col fs-4 text-center">¿Buscas acompañante? ¿Buscas cuidar a alguien? En Carefy podrás encontrar la mejor opción.</p>
        </div>
        <div className="pb-5">
          <div className="buscador container rounded p-2 d-flex gap-2 align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary btn-lg dropdown-toggle fs-4" data-bs-toggle="dropdown" aria-expanded="false">
                Ubicación
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-secondary btn-lg fs-4 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Disponibilidad
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Por horas</a></li>
                <li><a className="dropdown-item" href="#">Interno</a></li>
                <li><a className="dropdown-item" href="#">Diurno</a></li>
                <li><a className="dropdown-item" href="#">Nocturno</a></li>
              </ul>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-secondary btn-lg fs-4 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                ¿Qué buscas?
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Acompañante</a></li>
                <li><a className="dropdown-item" href="#">Acompañar a alguien</a></li>
              </ul>
            </div>
            <div>
            <span class="fa-solid fa-magnifying-glass fs-2 text-dark"></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}