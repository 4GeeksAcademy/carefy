import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../PublicarResena/publicarresena.module.css"
import { Rating } from "../../component/Rating/Rating.jsx";

export const PublicarResena = () => {

    return (
        <div className={`${style.paginaLogin}`}>
            <div className="container">

                <div className="row text-center mt-3 mb-5">
                    <div>
                        <h3>¿Qué tal fue?</h3>
                    </div>
                </div>

                <div className="row text-center mt-3 mb-5">
                    <div>
                        <h4>Es importante que valores al acompañante: </h4>
                    </div>
                </div>

                <div className="row">
                    <Rating />
                </div>

                <div className="row justify-content-center d-flex">
                    <div className="container text-center ">
                        <p className={`text-start ${style.texto}`}>Observaciones</p>
                        <textarea name="comentarios" cols={12} rows={8} className={`${style.observaciones}`}>

                        </textarea >
                    </div>
                </div>

                <div className="row">
                    <div className="container mb-4 justify-content-center d-flex ">
                        <button type="button" className={`btn btn-primary ${style.boton}`} >Enviar reseña</button>
                    </div>
                </div>




            </div>
        </div>

    )
}