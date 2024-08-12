import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../FormularioContacto/formulariocontacto.module.css"



export const FormularioContacto = () => {
    return (

        <form className={`mt-3 ${style.cajonFormulario} rounded`}>
            <h1 className={`${style.tituloFormulario}`} >CONTÁCTANOS</h1>
            <div className="row">
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" />
                    </div>
                </div>
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label htmlFor="asunto" className="form-label">Asunto</label>
                <input type="text" className="form-control" id="asunto" />
            </div>

            <div class="mb-3">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea type="text" cols={48} rows={5} className="form-control" id="mensaje" />
            </div>

            <div class="mb-3 ">
                <input type="checkbox" className="form-check-input me-2" id="CheckPrivacidad" />
                <label className="form-check-label">
                    <a>Acepto la política de privacidad de datos</a>
                </label>
            </div>
            <div className="text-center">
                <button type="submit" className={`${style.botonEnviar} btn`} >Enviar consulta</button>
            </div>
        </form>

    )
}