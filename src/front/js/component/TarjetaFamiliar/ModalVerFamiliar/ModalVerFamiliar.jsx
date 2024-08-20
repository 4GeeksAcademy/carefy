import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../../img/profileImg.png"
import style from "../../TarjetaFamiliar/tarjetafamiliar.module.css"


export const ModalVerFamiliar = ({ familiar }) => {

    // Función para describir el nivel de dependencia en función del resultado
    const nivelDepDescripcion = (dependency) => {
        switch (dependency) {
            case "Nivel 1":
                return "Acompañamiento. Es independiente en tareas diarias y personales";
            case "Nivel 2":
                return "Dependencia leve. Requiere ayuda para cosas puntuales en algún momento del día para la rutina o autonomía personal"
            case "Nivel 3":
                return "Dependencia moderada. Requiere ayuda para actividades básicas, dos o tres veces al día";
            case "Nivel 4":
                return "Dependencia severa. Necesita el apoyo indispensable de otra persona por pérdida de autonomía física, mental o intelectual";
            default:
                return ""
        }
    }

    function capitalizeFirstLetter(string) {
        if (string.length === 0) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

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



    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{capitalizeFirstLetter(familiar.alias)}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {/* Formulario */}
                <form className="form">
                    {/* Foto, alias, nombre y apellidos */}
                    <div className="row">
                        <div className="col-3">
                            <div className="mb-3" >
                                {familiar.photo ? (
                                    <img src={familiar.photo} className={`${style.card_img_top}`} alt="..." />
                                ) : (
                                    <img src={profileImg} className={`${style.card_img_top}`} alt="..." />
                                )}
                            </div>
                        </div>

                        <div className="col-9 row">
                            <div className="col-5">
                                <p><span className="fa-solid fa-user pe-2"></span><span className="pe-2">{familiar.name}</span>{familiar.lastname}</p>
                                <p><span className="fa-solid fa-id-card pe-2"></span>{getAge(familiar.birthdate)} años</p>
                                <p><span className="fa-solid fa-location-dot pe-2"></span>{familiar.location}, {familiar.province}</p>
                            </div>
                            <div className="col-7">
                                <p><span className="fw-bold">Fecha de nacimiento: </span>{new Date(familiar.birthdate).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p>
                                <p><span className="fw-bold">Dependencia:</span> {familiar.dependency}</p>
                                <p><span className="fw-bold">Teléfono:</span> {familiar.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <p className="fw-bold">Observaciones</p> 
                        <p>{familiar.description}</p>
                    </div>
                </form >
            </div>
        </div>
    )

}