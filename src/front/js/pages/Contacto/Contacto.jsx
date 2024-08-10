import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Contacto/contacto.module.css";
import dudas from "../../../img/dudas.jpg"
import { FormularioContacto } from "../../component/FormularioContacto/FormularioContacto.jsx";

export const Contacto = () => {

    return (
        <div className={`${style.paginaContacto}`}>
        <div className="container ">
            <div className="row tituloContacto text-center">
                <div className="row">
                    <h1>¿Te queda alguna duda?</h1>
                </div>
                <div className="row subtituloContacto">
                    <h4>No dudes en escribirnos. Estaremos encantados de ayudarte. </h4>
                </div>
                {/* eliminar de la 13 a la 18 para el jumbotron */}
            </div>

            <div className={`row ${style.contenedorForm}`}>
                <div className={`col mb-5 ${style.formulario} rounded`}>
                    <FormularioContacto />

                </div>
                <div className="col align-content-center">
                    <img className={`${style.imagenDudas} rounded img-fluid`} src={dudas}></img>
                </div>
            </div>
        </div>
        </div >
    )
}