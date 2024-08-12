import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../../component/FormularioLogin/formulariologin.module.css"

export const FormularioLogin = () => {

    return (
        <form className="form p-4">
            <div className="mb-3">
                <label htmlFor="email" className="form-label fs-5">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Introduce tu correo electrónico"></input>
            </div>



            <div className="mb-3">
                <label htmlFor="password" className="form-label fs-5">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Introduce tu contraseña" />
            </div>


            <div className="mb-3">
                <p className="text-secondary fst-italic">¿Has olvidado la contraseña? <button className="btn text-primary fw-bold">Resturar</button></p>
            </div>


            <div className="text-center">
                <button type="submit" className={`${style.botonInicio} fs-5 submit btn btn-primary mb-3`} >Iniciar sesión</button>
            </div>
        </form>

    )}
