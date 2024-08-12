import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../FormularioRegistro/formularioregistro.module.css"

export const FormularioRegistro = () => {

  return (
    <form className={`form ${style.cajonFormulario}`}>
      <div className="mb-3">
        <label htmlFor="email" className={`form-label ${style.colorLetra}`}>Correo</label>
        <input type="email" className="form-control" id="email" placeholder="Introduce tu correo"></input>

      </div>
      <div className="mb-3">
        <label htmlFor="usuario" className={`form-label ${style.colorLetra}`}>Usuario</label>
        <input type="text" className="form-control" id="usuario" placeholder="Crea un nombre de usuario" />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className={`form-label ${style.colorLetra}`}>Contraseña</label>
        <input type="password" className="form-control" id="password" />
      </div>

      <div className="mb-3">
        <label htmlFor="disabledSelect" className={`form-label ${style.colorLetra}`}>Seleccione como quiere registrarse</label>
        <select id="disabledSelect" className="form-select">
          <option>Usuario</option>
          <option>Acompañante</option>
        </select>
      </div>
      <div className="text-center">
        <button type="submit" className={`${style.botonInicio} submit btn btn-primary mb-3`}>Registrarme</button>
      </div>
    </form>
    
  )
}
