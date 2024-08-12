import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import manosUnidas from "../../../img/manosUnidas.jpg";
import ayudahombre from "../../../img/ayudahombre.jpg";
import style from "../Registro/registro.module.css"
import { FormularioRegistro } from "../../component/FormularioRegistro/FormularioRegistro.jsx"

export const Registro = () => {


    return (
        <div className={`${style.pagina}`}>
            <div className="container">
                <div className="row">
                    
                    <div className= {`col ${style.contenedorTitulo}`}><h1 className= {`${style.titulo} text-center`} >Espacio para el Jumbotrón de Registro</h1></div>  
                    {/* quitar de la 22 a la 28 para meter jumbotron */}
                </div>

                <div className= {`${style.cuerpoSignUp} row mb-4`} >
                    <div className="col">
                        <div className= {`${style.contenedorImagen1}`}>
                            <img className= {`${style.imagen1} img-fluid rounded`}  src={manosUnidas}></img>
                        </div>
                    </div>

                    <div className={`col ${style.formulario} rounded d-flex align-items-center justify-content-center}`}>
                        <FormularioRegistro />
                    </div>

                    <div className="col">
                        <div>
                            <img className={`${style.imagen2} img-fluid rounded`} src={ayudahombre}></img>
                        </div>
                    </div>
                </div>
                <div className={`row ${style.texto}`} >
                    <p className="text-center">“Envejecer es como escalar una montaña; mientras se sube las fuerzas disminuyen, pero la mirada es más libre, la vista más amplia y serena.”</p>
                    <p className="text-center">Ingmar Bergman</p>
                </div>
            </div>
        </div>
    )
}