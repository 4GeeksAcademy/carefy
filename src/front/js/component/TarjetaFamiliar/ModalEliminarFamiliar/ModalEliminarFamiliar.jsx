import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext.js";
import styles from "../../BloqueAnuncio/BloqueAnuncio.module.css";


export const ModalEliminarFamiliar = ({ familiar }) => {

    const { store, actions } = useContext(Context);

    return (
        <div>
            {store.singleAd.user_id === store.userData.userId ?
                <div className={`position-absolute ${styles.fav_icon}`}>
                    <span className="fa-solid fa-pencil pe-3"></span>
                    <span className="fa-regular fa-trash-can" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></span>

                    <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body fw-bold fs-4">
                                    ¿Desea eliminar el anuncio?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                    <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(store.singleAd.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : ""
            }
        </div>
    )
}