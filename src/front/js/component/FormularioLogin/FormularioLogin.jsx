import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../../component/FormularioLogin/formulariologin.module.css"

export const FormularioLogin = () => {

    return (
        <form className={`form ${style.cajonFormulario}`}>
            <div className="mb-3">
                <label htmlFor="email" className={`form-label ${style.colorletraFL}`}>Correo</label>
                <input type="email" className="form-control" id="email" placeholder="Introduce tu correo"></input>
            </div>



            <div className="mb-3">
                <label htmlFor="password" className={`form-label ${style.colorletraFL}`}>Contraseña</label>
                <input type="password" className="form-control" id="password" />
            </div>


            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className={`form-check-label ${style.colorletraFL} `}for="exampleCheck1">Recuérdame</label>
            </div>


            <div className="text-center">
                <button type="submit" className={`${style.botonInicio} submit btn btn-primary mb-3`} >Iniciar sesión</button>
            </div>
        </form>

    )}
