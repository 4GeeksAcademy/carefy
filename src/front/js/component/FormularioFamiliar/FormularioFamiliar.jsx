import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../FormularioFamiliar/formulariofamiliar.module.css"



export const FormularioFamiliar = () => {
    return (

        <form className={`mt-1 ${style.cajonFormulario} rounded`}>
            <h5 className={`${style.tituloFormulario}`} >Debes completar tus datos como responsable del mayor que será acompañado</h5>
            <div className="row">
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" />
                    </div>
                </div>
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos" aria-describedby="emailHelp" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="pepe@pepe.com" />
                    </div>
                </div>
                <div className="col">
                    <div class="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono de contacto</label>
                        <input type="tel" className="form-control" id="telefono" />
                    </div>
                </div>
            </div>



            <div className="row">
                <div className="col">
                <label htmlFor="telefono" className="form-label">Provincia</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Selecciona la provincia</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>

         
            <div className="text-center">
                <button type="submit" className={`${style.botonGuardar} btn`} >Guardar datos</button>
            </div>
        </form>

    )
}