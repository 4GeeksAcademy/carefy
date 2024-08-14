import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../FormularioContacto/formulariocontacto.module.css"



export const FormularioContacto = () => {
    return (

        <form>
            <div className="row">
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="nombre" className="form-label fs-5">Nombre</label>
                        <input type="text" className="form-control" id="nombre" placeholder="Escribe tu nombre"/>
                    </div>
                </div>
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="email" className="form-label fs-5">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Escribe tu correo electrónico"/>
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label htmlFor="asunto" className="form-label fs-5">Asunto</label>
                <input type="text" className="form-control" id="asunto" placeholder="Título de la consulta" />
            </div>

            <div class="mb-3">
                <label htmlFor="mensaje" className="form-label fs-5">Mensaje</label>
                <textarea type="text" cols={30} rows={5} className="form-control" id="mensaje" placeholder="Escribe aquí tu consulta"/>
            </div>

            <div class="mb-3 ">
                <input type="checkbox" className="form-check-input me-2" id="CheckPrivacidad" />
                <label className="form-check-label">
                    <span className="fs-5">Acepto la política de privacidad de datos</span>
                </label>
            </div>
            <div>
                <button type="submit" className={`${style.botonEnviar} btn fs-5`} >Enviar consulta</button>
            </div>
        </form>

    )
}