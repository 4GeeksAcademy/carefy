import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../img/profileImg.png"

export const TarjetaFamiliar = () => {

    return (

        <div class="card" style={{ width: '15rem' }}>
            <h5 class="card-title alias text-center">alias: mi padre</h5>
            <img src={profileImg} class="card-img-top" alt="..." />
            <div class="card-body">
                <div className="row">

                    {/* Al pulsar este botón se abrirá la ventana modal del usuario con los campos bloqueados en sólo lectura */}
                    <div className="col"><a href="#" class="btn btn-primary"> <span className="bi bi-eye"></span>
                    </a>
                    </div>

                    {/* Al pulsar en este campo se abrirá el modal del usuario con los campos editables */}
                    <div className="col"><a href="#" class="btn btn-primary"><span class="glyphicon">&#xe104;</span>
                    </a>
                    </div>

                    <div className="col"><a href="#" class="btn btn-primary"><span class="glyphicon">&#xe107;</span>
                    </a>
                    </div>
                </div>

            </div>
        </div>
    )
}