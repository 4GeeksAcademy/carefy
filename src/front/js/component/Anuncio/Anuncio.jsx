import React from "react";
import styles from "./Anuncio.module.css"
import { Jumbotron } from "../Jumbotron/Jumbotron.jsx";


export const Anuncio = ({ title, userName, age, location, state, description, availability, startDate, endDate, price, medicine, dependency, observations}) => {



    return (
        <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
            {/* <span className={`fa-regular fa-heart position-absolute ${styles.fav_icon}`}></span> */}
            <div className={`position-absolute ${styles.fav_icon}`}>
                <span className="fa-solid fa-pencil pe-3"></span>
                <span class="fa-regular fa-trash-can"></span>
            </div>
            <h1 className="mb-5 pe-5 me-3">Necesito acompañante para mujer de 83 años para cuidarla los fines de semana</h1>
            <div className="d-flex align-items-start justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-wrap">
                    <div className={`${styles.avatar} rounded`}>
                        <img src="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={`img-fluid`} />
                    </div>
                    <div className="ms-3 fs-4 mt-3">
                        <p className=""><i class="fa-solid fa-user pe-3"></i>María Rosa Gutierrez</p>
                        <p><i class="fa-solid fa-id-card pe-3"></i>83 años</p>
                        <p><span class="fa-solid fa-location-dot pe-1"></span> Valencia</p>
                    </div>
                </div>
                {/* <button className={`btn ${styles.btn_postularse} fs-4 fw-bold`}>POSTULARSE</button> */}
                <p className="fs-4"><span className="fw-bold">Estado</span>: <span className="text-secondary">pendiente de moderación</span></p>
            </div>
            <div className="pt-4">
                <p className="fs-5">Busco cuidadora para cuidar de persona mayor en su casa. Preferiblemente de nacionalidad española. Se busca persona seria, para mucho tiempo. Abstenerse personas que vayan a estar poco tiempo. Es en Sevilla capital. Llamen y les atenderá su hija Remedios. Busco cuidadora para cuidar de persona mayor en su casa. Preferiblemente de nacionalidad española. Se busca persona seria, para mucho tiempo. Abstenerse personas que vayan a estar poco tiempo. Es en Sevilla capital. Llamen y les atenderá su hija Remedios.</p>
            </div>
            <div className="pt-3 row">
                <div className="col-12 col-sm-7">
                    <p className="fs-4 fw-bold"><span class="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
                    <div className="d-flex fs-5 gap-5 align-items-baseline">
                        <div>
                            <p className="ps-4 ms-3 fs-4">Por horas</p>
                        </div>
                        <div className="d-flex gap-3 flex-wrap">
                            <p>Inicio: <span className="text-secondary">01/05/2024</span></p>
                            <p>Finalización: <span className="text-secondary">01/08/2024</span></p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-5">
                    <p className="fs-4 fw-bold"><span class="fa-solid fa-coins pe-3"></span>Precio (hora)</p>
                    <p className="fs-4 ps-4 ms-3">10 €</p>
                </div>
            </div>
            <div className="pt-4 row">
                <div className="col-12 col-sm-7">
                    <p className="fs-4 fw-bold"><span class="fa-solid fa-pills pe-3"></span>Medicinas</p>
                    <div className="d-flex fs-5">
                        <div className="ps-4 ms-3 pb-3">
                            <li>Ibuprofeno</li>
                            <li>Aspirina</li>
                            <li>Melatol</li>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-5">
                    <p className="fs-4 fw-bold"><span class="fa-solid fa-wheelchair pe-3"></span>Nivel de depencia</p>
                    <p className="fs-4 ps-4 ms-3">5<span className="text-secondary italic fst-italic fs-5 ps-2">(alto)</span></p>
                    <p className="fs-5 ps-4 ms-3"><span className="fst-italic">Observaciones</span>: requiere ayuda para el aseo y comer.</p>
                </div>
            </div>
        </div>
    )
}