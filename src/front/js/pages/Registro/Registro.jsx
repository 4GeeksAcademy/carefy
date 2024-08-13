import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ayudahombre from "../../../img/ayudahombre.jpg";
import style from "../Registro/registro.module.css"
import { FormularioRegistro } from "../../component/FormularioRegistro/FormularioRegistro.jsx"
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";

export const Registro = () => {


    return (
        <>
        <Jumbotron bgImg={ {backgroundImage: "url('https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg')" }} title={"Empieza a ser parte de la comunidad Carefy"} subtitle={"El registro es gratuito y podrás buscar o encontrar un puesto como acompañante."} />

        <div className={`${style.pagina}`}>
            <div className="container">
                <div className="row">
                </div>

                <div className= {`${style.cuerpoSignUp} row`} >
                    <div className="col">
                        <div className= {`${style.contenedorImagen1}`}>
                            <img className= {`${style.imagen1} img-fluid rounded`}  src="https://plus.unsplash.com/premium_photo-1663126593953-20b26e1b235d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                        </div>
                    </div>

                    <div className={`col ${style.formulario} rounded d-flex mx-4 mt-5`}>
                        <FormularioRegistro />
                    </div>

                    <div className="col">
                        <div>
                            <img className={`${style.imagen2} img-fluid rounded`} src="https://plus.unsplash.com/premium_photo-1663036775946-7d38a3b94955?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                        </div>
                    </div>
                </div>
                <div className="row py-4" >
                    <p className="text-center fs-3">“Envejecer es como escalar una montaña; mientras se sube las fuerzas disminuyen, pero la mirada es más libre, la vista más amplia y serena.”</p>
                    <p className="text-center fs-5 fst-italic">Ingmar Bergman</p>
                </div>
            </div>
        </div>
        </>
    )
}