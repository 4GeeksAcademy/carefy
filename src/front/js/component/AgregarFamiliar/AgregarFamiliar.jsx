import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../AgregarFamiliar/agregarfamiliar.module.css"

export const AgregarFamiliar = () => {
    const [nacimiento, setNacimiento] = useState("");
    const [edad, setEdad] = useState(0);

    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date()
        const fechaNac = new Date(fechaNacimiento);
        let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth()

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edadCalculada--;
        }
        return edadCalculada
    }



    /**
     *Recoge la fecha que le hemos pasado a través del calendario.
     *Lo pasa a la variable fechaNacimiento. 
     *Guardamos esa fecha con el setNacimiento
     *Guardamos el valor edad llamando a la función de arriba
     * @param {e} Recibe el evento del input de la fecha
     */
    const handleBirthdayChange = (e) => {
        const fechaNacimiento = e.target.value;
        setNacimiento(fechaNacimiento);
        setEdad(calcularEdad(fechaNacimiento));
    };



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
                <div className="row">
                    <div className="col-8">
                        <label for="nacimiento">Fecha nacimiento:</label><br></br>
                        <input onChange={handleBirthdayChange} type="date" id="nacimiento" name="nacimiento" value={nacimiento} />
                    </div>
                    <div className="col">
                        <label for="birthday">Edad: </label><br></br>
                        <label for="birthday">{edad} </label>

                    </div>
                </div>

            </div>


            {/* <div className="mb-3">
                <label htmlFor="telefono" className="form-label">¿Toma medicinas?</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Selecciona una opción:</option>
                    <option value="1">Si</option>
                    <option value="2">No</option>
                </select>
            </div> */}

            <div className="mb-3">
                <label htmlFor="necesita" className="form-label">Selecciona las necesidades</label>
                <div class="form-check">

                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        Supervisión y control de medicinas
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label class="form-check-label" for="flexCheckChecked">
                        Ayuda con comidas
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        Ayuda con aseo
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label class="form-check-label" for="flexCheckChecked">
                        Ayuda con movilidad "leve"
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        Ayuda con movilidad moderada y severa
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label class="form-check-label" for="flexCheckChecked">
                        Acompañamiento y entretenimiento
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label class="form-check-label" for="flexCheckChecked">
                        Paseos
                    </label>
                </div>
            </div>


            <div class="mb-3">
            <label htmlFor="provincia" className="form-label">Provincia</label>
            <select class="form-select" aria-label="Default select example">
                <option selected>Selecciona la provincia</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            </div>


            <div class="mb-3">
                <label for="formFile" class="form-label">Puedes subir una foto</label>
                <input class="form-control" type="file" id="formFile" />
            </div>

            <div className="mb-3">
                <label htmlFor="observaciones" className="form-label">Otra información importante</label>
                <textarea className="form-control" id="observaciones" placeholder="Puedes añadir cualquier información / necesidad relevante para el acompañante" />
            </div>


            <button type="submit" claclassNamess="btn btn-primary">Guardar usuario</button>
        </form>

    )
}