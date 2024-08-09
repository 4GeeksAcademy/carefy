import React from "react";
import styles from "./Anuncio.module.css"
import { Jumbotron } from "../Jumbotron/Jumbotron.jsx";


export const Anuncio = ({ title, userName }) => {

    

    return (
        <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
            <span className={`fa-regular fa-heart position-absolute ${styles.fav_icon}`}></span>
            <h1 className="mb-5 pe-5 me-3">Necesito acompañante para mujer de 83 años para cuidarla los fines de semana</h1>
            <div className="d-flex align-items-start justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-wrap">
                    <div className={`${styles.avatar} rounded`}>
                        <img src="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={`img-fluid`} />
                    </div>
                    <div className="ms-3 fs-4 mt-3">
                        <p className="fw-bold">María Rosa Gutierrez</p>
                        <p>83 años</p>
                        <p><span class="fa-solid fa-location-dot pe-1"></span> Valencia</p>
                    </div>
                </div>
                <button className={`btn ${styles.btn_postularse} fs-4 fw-bold`}>POSTULARSE</button>
            </div>
            <div className="pt-4">
                <p className="fs-5">Busco cuidadora para cuidar de persona mayor en su casa. Preferiblemente de nacionalidad española. Se busca persona seria, para mucho tiempo. Abstenerse personas que vayan a estar poco tiempo. Es en Sevilla capital. Llamen y les atenderá su hija Remedios. Busco cuidadora para cuidar de persona mayor en su casa. Preferiblemente de nacionalidad española. Se busca persona seria, para mucho tiempo. Abstenerse personas que vayan a estar poco tiempo. Es en Sevilla capital. Llamen y les atenderá su hija Remedios.</p>
            </div>
            <div className="pt-3">
                <p className="fs-4">Disponibilidad</p>
            </div>
        </div>
    )
}