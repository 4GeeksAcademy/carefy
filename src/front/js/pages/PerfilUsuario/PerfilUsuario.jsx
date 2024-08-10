import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../PerfilUsuario/perfilusuario.module.css";
import nietaabuela from "../../../img/nietaabuela.jpg"
import { FormularioFamiliar } from "../../component/FormularioFamiliar/FormularioFamiliar.jsx";

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
                    <p>aqui podrás añadir a usuarios</p>
                    {/* <!-- Button trigger modal --> */}
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>

                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar un familiar</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div >
    )
}