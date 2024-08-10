import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../AgregarFamiliar/agregarfamiliar.module.css"

export const AgregarFamiliar = () => {

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="alias" className="form-label">Alias</label>
                <input type="text" class="form-control" id="alias" placeholder="Ejemplo: mi padre" />

            </div>

            <div className="mb-3">
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input type="text" className="form-control" id="apellidos" />
            </div>

            <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Telefono</label>
                <input type="tel" className="form-control" id="telefono" />
            </div>

            <div className="mb-3">
                <label for="start">Start date:</label>
                <input type="date" id="start" name="trip-start" value="2018-07-22" min="1900-01-01" max="2018-12-31" />
            </div>

            <div className="mb-3">
                EDAD:
            </div>

            <select class="form-select" aria-label="Default select example">
                <label htmlFor="telefono" className="form-label">¿Toma medicinas?</label>
                <option selected>Selecciona una opción:</option>
                <option value="1">Si</option>
                <option value="2">No</option>
            </select>







            <div class="mb-3">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" type="file" id="formFile"/>
            </div>

            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" />
            </div>


            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" claclassNamess="btn btn-primary">Submit</button>
        </form>

    )
}