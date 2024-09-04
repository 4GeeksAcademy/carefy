import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../img/profileImg.png"
import style from "../TarjetaFamiliar/tarjetafamiliar.module.css"
import {ModalVerFamiliar} from "./ModalVerFamiliar/ModalVerFamiliar.jsx"
import {ModalEditarFamiliar} from "./ModalEditarFamiliar/ModalEditarFamiliar.jsx"
import {ModalEliminarFamiliar} from "./ModalEliminarFamiliar/ModalEliminarFamiliar.jsx"
 
// Recibe también index para que se pueda generar un id diferente en cada botón del modal
export const TarjetaFamiliar = ({ familiar, index }) => {

    // Se crean variables dinámicas para controlar el uso de los botones de los modales
    const mostrarFamiliarId = `mostrarFamiliar-${index}`;
    const editarFamiliarId = `editarFamiliar-${index}`;
    const eliminarFamiliarId = `eliminarFamiliar-${index}`;

    function capitalizeFirstLetter(string) {
        if (string.length === 0) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }



    return (

        <div className="card" style={{ width: '15rem' }}>
            <h5 className="card-title text-center pt-2">{capitalizeFirstLetter(familiar.alias)}</h5>

            {/* Si el usuario ha subido una foto, se pinta la foto. Si no, se pinta el muñeco */}
            {familiar.photo ? (
                <img src={familiar.photo} className={`${style.card_img_top }`} alt="..." />
            ) : (
                <img src={profileImg} className={`${style.card_img_top }`} alt="..." />
            )}

            <div className="py-2">
                <div className="row">

                    {/* Al pulsar este botón se abrirá la ventana modal del usuario con los campos bloqueados en sólo lectura */}
                    <div className="col">
                        <button type="button" className={`${style.btn_tarjeta} ms-3 btn`}
                            data-bs-toggle="modal" data-bs-target={`#${mostrarFamiliarId}`}>
                            <span className="fa-solid fa-eye fs-5"></span>
                        </button>
                        {/* <!-- Modal --> */}
                        <div className={`modal fade`} id={mostrarFamiliarId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <ModalVerFamiliar familiar={familiar}/>
                            </div>
                        </div>
                    </div>


                    {/* Al pulsar en este campo se abrirá el modal del usuario con los campos editables */}
                    <div className="col">
                        <button type="button" className={`${style.btn_tarjeta} ms-2 btn`}
                        data-bs-toggle="modal" data-bs-target={`#${editarFamiliarId}`}>
                            <span className="fa-solid fa-pencil fs-5"></span>
                        </button>
                        <div className={`modal fade`} id={editarFamiliarId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <ModalEditarFamiliar familiar={familiar}/>
                            </div>
                        </div>
                    </div>

                    {/* Al pulsar en este campo se abrirá un modal para confirmar la eliminación del familiar */}
                    <div className="col">
                        <button type="button" className={`${style.btn_tarjeta} btn`}
                        data-bs-toggle="modal" data-bs-target={`#${eliminarFamiliarId}`}>
                            <span className="fa-solid fa-trash-can fs-5"></span>
                        </button>
                        <div className={`modal fade`} id={eliminarFamiliarId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <ModalEliminarFamiliar familiar={familiar}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}