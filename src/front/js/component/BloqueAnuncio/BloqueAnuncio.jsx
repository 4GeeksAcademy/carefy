import React from "react";
import styles from "./BloqueAnuncio.module.css"


export const BloqueAnuncio = ({ title, avatar, userName, age, location, state, description, availability, startDate, endDate, price, task, dependency, observations}) => {



    return (
        <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
            {/* ICONO PARA EL ACOMPAÑANTE */}
            <span className={`fa-regular fa-heart position-absolute ${styles.fav_icon}`}></span>

            {/* ICONOS PARA EL USUARIO (FAMILIAR) */}
            {/* <div className={`position-absolute ${styles.fav_icon}`}>
                <span className="fa-solid fa-pencil pe-3"></span>
                <span className="fa-regular fa-trash-can"></span>
            </div> */}

            <h1 className="mb-5 pe-5 me-3">{title}</h1>
            <div className="d-flex align-items-start justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-wrap">
                    <div className={`${styles.avatar} rounded`}>
                        <img src={avatar} className={`img-fluid`} />
                    </div>
                    <div className="ms-3 fs-4 mt-3">
                        <p className=""><span className="fa-solid fa-user pe-3"></span>{userName}</p>
                        <p><span className="fa-solid fa-id-card pe-3"></span>{age}</p>
                        <p><span className="fa-solid fa-location-dot pe-1"></span>{location}</p>
                    </div>
                </div>
                {/* BOTON POSTULARSE/CANCELAR POSTULACION PARA ACOMPAÑANTES */}
                {/* <button className={`btn ${styles.btn_postularse} fs-4 fw-bold`}>POSTULARSE</button> */}
                <button className={`btn ${styles.btn__cancel_postularse} fs-4 fw-bold`}>CANCELAR POSTULACIÓN</button>

                {/* ESTADO DEL ANUNCIO PARA EL USUARIO */}
                {/* <p className="fs-4"><span className="fw-bold">Estado</span>: <span className="text-secondary">{state}</span></p> */}
            </div>
            <div className="pt-4">
                <p className="fs-5">{description}</p>
            </div>
            <div className="pt-3 row">
                <div className="col-12 col-sm-7">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
                    <div className="d-flex fs-5 gap-5 align-items-baseline">
                        <div>
                            <p className="ps-4 ms-3 fs-4">{availability}</p>
                        </div>
                        <div className="d-flex gap-3 flex-wrap">
                            <p>Inicio: <span className="text-secondary">{startDate}</span></p>
                            <p>Finalización: <span className="text-secondary">{endDate}</span></p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-5">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-coins pe-3"></span>Precio (hora)</p>
                    <p className="fs-4 ps-4 ms-3">{price}</p>
                </div>
            </div>
            <div className="pt-4 row">
                <div className="col-12 col-sm-7">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-list-check pe-3"></span>Tareas principales</p>
                    <div className="d-flex fs-5">
                        <div className="ps-4 ms-3 pb-3">
                            <li>{task}</li>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-5">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-wheelchair pe-3"></span>Nivel de dependencia</p>
                    <p className="fs-4 ps-4 ms-3">{dependency}<span className="text-secondary italic fst-italic fs-5 ps-2"></span></p>
                    <p className="fs-5 ps-4 ms-3"><span className="fst-italic">Observaciones</span>: {dependency}</p>
                </div>
            </div>
        </div>
    )
}