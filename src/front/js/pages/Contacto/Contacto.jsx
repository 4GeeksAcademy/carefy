import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Contacto/contacto.module.css";
import dudas from "../../../img/dudas.jpg"
import { FormularioContacto } from "../../component/FormularioContacto/FormularioContacto.jsx";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx"

export const Contacto = () => {

    return (
        <>
            <Jumbotron bgImg={{ backgroundImage: "url('https://images.pexels.com/photos/7329664/pexels-photo-7329664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }} title={"¿Tienes alguna consulta?"} subtitle={"No dudes en escribirnos. Te responderemos lo antes posible."} />
           
           <div className={`${style.paginaContacto}`}>
                <div className={`container bg-light mt-5 rounded ${style.formulario}`}>
                    <div className={`row p-4 mb-5 ${style.contenedorForm}`}>
                        <div className={`col  rounded`}>
                            <FormularioContacto />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}