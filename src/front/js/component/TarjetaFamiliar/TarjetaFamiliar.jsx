import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../img/profileImg.png"

export const TarjetaFamiliar = () => {

    return (

        <div className="card" style={{ width: '15rem' }}>
            <h5 className="card-title text-center pt-2">Alias: mi padre</h5>
            <img src={profileImg} class="card-img-top" alt="..." />
            <div className="card-body">
                <div className="row text-center">

                    {/* Al pulsar este botón se abrirá la ventana modal del usuario con los campos bloqueados en sólo lectura */}
                    <div className="col">
                        <span className="fa-solid fa-eye fs-5"></span>
                    </div>

                    {/* Al pulsar en este campo se abrirá el modal del usuario con los campos editables */}
                    <div className="col">
                        <span className="fa-solid fa-pencil fs-5"></span>
                    </div>

                    <div className="col">
                        <span className="fa-solid fa-trash-can fs-5"></span>
                    </div>
                </div>

            </div>
        </div>
    )
}