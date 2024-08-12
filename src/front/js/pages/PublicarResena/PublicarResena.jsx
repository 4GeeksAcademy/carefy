import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../PublicarResena/publicarresena.module.css"
import { Rating } from "../../component/Rating/Rating.jsx";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";

export const PublicarResena = () => {

    return (
        <>
            <Jumbotron bgImg={{ backgroundImage: "url('https://images.pexels.com/photos/6939475/pexels-photo-6939475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }} title={"¿Qué tal fue?"} subtitle={"Es importante que valores como ha sido el trabajo del acompañante."} />
            <div className={`${style.paginaLogin}`}>
                <div className="container">

                    <div className="row mt-4">
                        <Rating />
                    </div>

                    <div className="row justify-content-center d-flex">
                        <div className="container text-center ">
                            <p className={`text-start ${style.texto}`}>Observaciones</p>
                            <textarea name="comentarios" cols={12} rows={8} className={`${style.observaciones}`} placeholder="Haznos saber cualquier cosa sobre el acompañante">

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
        </>

    )
}