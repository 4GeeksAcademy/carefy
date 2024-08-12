import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Contacto/contacto.module.css";
import dudas from "../../../img/dudas.jpg"
import { FormularioContacto } from "../../component/FormularioContacto/FormularioContacto.jsx";
import {Jumbotron} from "../../component/Jumbotron/Jumbotron.jsx"

export const Contacto = () => {

    return (
        <>
        <Jumbotron bgImg={ {backgroundImage: "url('https://images.pexels.com/photos/7329664/pexels-photo-7329664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }} title={"¿Tienes alguna duda"} subtitle={"No dudes en escribirnos. Te responderemos lo antes posible."} />
        <div className={`${style.paginaContacto}`}>
        <div className="container ">
           

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
        </>
    )
}