import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../img/profileImg.png"
import style from "../TarjetaFamiliar/tarjetafamiliar.module.css"
import {ModalVerFamiliar} from "./ModalVerFamiliar/ModalVerFamiliar.jsx"
import {ModalEditarFamiliar} from "./ModalEditarFamiliar/ModalEditarFamiliar.jsx"
 
export const TarjetaFamiliar = ({ familiar }) => {
    console.log('familiar card ', familiar);






    return (

        <div className="card" style={{ width: '15rem' }}>
            <h5 className="card-title text-center pt-2">{familiar.alias}</h5>

            {/* Si el usuario ha subido una foto, se pinta la foto. Si no, se pinta el muñeco */}
            {familiar.photo ? (
                <img src={familiar.photo} className="card-img-top" alt="..." />
            ) : (
                <img src={profileImg} className="card-img-top" alt="..." />
            )}

            <div className="card-body">
                <div className="row">

                    {/* Al pulsar este botón se abrirá la ventana modal del usuario con los campos bloqueados en sólo lectura */}
                    <div className="col">
                        <button type="button" className="btn btn-light"
                            data-bs-toggle="modal" data-bs-target="#mostrarFamiliar">
                            <span className="fa-solid fa-eye fs-5"></span>
                        </button>

                        {/* <!-- Modal --> */}
                        <div className={`modal fade`} id="mostrarFamiliar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <ModalVerFamiliar familiar={familiar}/>
                            </div>
                        </div>
                    </div>


                    {/* Al pulsar en este campo se abrirá el modal del usuario con los campos editables */}
                    <div className="col">
                        <button type="button" className="btn btn-light"
                        data-bs-toggle="modal" data-bs-target="#editarFamiliar">
                            <span className="fa-solid fa-pencil fs-5"></span>
                        </button>
                        <div className={`modal fade`} id="editarFamiliar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <ModalEditarFamiliar familiar={familiar}/>
                            </div>
                        </div>
                    </div>


                    <div className="col">
                        <button type="button" className="btn btn-light">
                            <span className="fa-solid fa-trash-can fs-5"></span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}