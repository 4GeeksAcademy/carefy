import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Login/login.module.css"
import ancianafeliz from "../../../img/ancianafeliz.jpg";
import manosanciana from "../../../img/manosanciana.jpg";
import { FormularioLogin } from "../../component/FormularioLogin/FormularioLogin.jsx";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";

export const Login = () => {

    return (
        <>
        <Jumbotron bgImg={ {backgroundImage: "url('https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }} title={"Accede a la comunidad Carefy"} subtitle={"Recuerda que el acceso y los servicios son totalmente gratuitos."} />
        <div className={`${style.paginaLogin}`}>

            <div className="container">               

                <div className={`row mb-4 ${style.cuerpo} ${style.cuerpoLogin}`}>
                    <div className="col me-2">
                        <div className={`${style.contenedorImagen1}`}>
                            <img className={`${style.imagen1}  img-fluid rounded`}  src={ancianafeliz}></img>
                        </div>
                    </div>

                    <div className={`col ${style.formulario} rounded d-flex align-items-center justify-content-center`}>
                        <FormularioLogin />
                    </div>

                    <div className="col d-flex justify-content-center">
                        <div>
                            <img className={`${style.imagen2}  img-fluid rounded`}  src={manosanciana}></img>
                        </div>
                    </div>
                </div>
                <div className={`row ${style.texto}`}>
                    <p className="text-center">“Envejecer no es juventud perdida, sino una nueva etapa de oportunidad y fuerza.”</p>
                    <p className="text-center">Betty Frieda</p>
                </div>
            </div>
        </div>
        </>
    )
}