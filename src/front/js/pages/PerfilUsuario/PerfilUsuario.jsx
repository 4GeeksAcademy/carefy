import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../PerfilUsuario/perfilusuario.module.css";
import nietaabuela from "../../../img/nietaabuela.jpg"
import { FormularioFamiliar } from "../../component/FormularioFamiliar/FormularioFamiliar.jsx";
import { AgregarFamiliar } from "../../component/AgregarFamiliar/AgregarFamiliar.jsx";
import { TarjetaFamiliar } from "../../component/TarjetaFamiliar/TarjetaFamiliar.jsx";

export const PerfilUsuario = () => {

    return (
        <div className={`${style.paginaContacto}`}>
            <div className="container ">
                <div className="row tituloContacto text-center">
                    <div className="row">
                        <h1>Este es tu perfil como usuario</h1>
                    </div>
                    <div className="row subtituloContacto">
                        <h4>A continuación debes completar unos datos obligatorios </h4>
                    </div>
                    {/* eliminar de la 13 a la 18 para el jumbotron */}
                </div>

                <div className="row">
                    <div className={`col ${style.formulario} ${style.contenedorForm} rounded align-content-center`}>
                        <FormularioFamiliar />
                    </div>


                    <div className="col align-content-center">
                        <img className={`${style.imagenDudas} rounded img-fluid`} src={nietaabuela}></img>
                    </div>
                </div>

                <div className="row">

                    <div className="mt-4 text-center">
                        <h4>Aqui podrás añadir a usuarios</h4>
                    </div>

                    {/* <!-- Button trigger modal --> */}
                    <button type="button" className={`btn btn-primary ${style.botonAgregarUsuario}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Agregar un usuario
                    </button>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar un familiar</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AgregarFamiliar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 d-flex justify-content-start">
                        <TarjetaFamiliar />
                    </div>
                    <div className="col-3 d-flex justify-content-start">
                        <TarjetaFamiliar />
                    </div>
                </div>


                <div className="row text-center d-flex justify-content-center">
                    <button type="button" className= {`btn btn-primary mt-5 mb-4 ${style.botonPubAnuncio}`} >Publicar un anuncio</button>
                </div>

            </div>


        </div >
    )
}