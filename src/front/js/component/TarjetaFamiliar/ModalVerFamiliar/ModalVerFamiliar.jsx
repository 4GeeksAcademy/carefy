import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../../img/profileImg.png"
import style from "../../TarjetaFamiliar/tarjetafamiliar.module.css"


export const ModalVerFamiliar = ({ familiar }) => {

    // Función para describir el nivel de dependencia en función del resultado
    const nivelDepDescripcion = (dependency) => {
        switch (dependency) {
            case "Nivel1":
                return "Acompañamiento. Es independiente en tareas diarias y personales";
            case "Nivel2":
                return "Dependencia leve. Requiere ayuda para cosas puntuales en algún momento del día para la rutina o autonomía personal"
            case "Nivel3":
                return "Dependencia moderada. Requiere ayuda para actividades básicas, dos o tres veces al día";
            case "Nivel4":
                return "Dependencia severa. Necesita el apoyo indispensable de otra persona por pérdida de autonomía física, mental o intelectual";
            default:
                return "Se debee especificar un nivel de dependencia."
        }
    }

    // Función para cambiar el formato a dd/mm/aaaa
    const formatDate = (dateString) => {
        if (dateString) {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        }

    }

    //Función para calcular la edad actual
    const calcularEdad = (birthdate) => {
        const hoy = new Date();
        const birthDate = new Date(birthdate);
        let edad = hoy.getFullYear() - birthDate.getFullYear();
        const meses = hoy.getMonth() - birthDate.getMonth();

        if (meses < 0 || (meses === 0 && hoy.getDate() < birthDate.getDate())) {
            edad--;
        }
        return edad;
    }



    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Familiar: {familiar.alias}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {/* Formulario */}
                <form className="form">
                    {/* Foto, alias, nombre y apellidos */}
                    <div className="row">
                        <div className="col-3">
                            <div className="mb-3" >
                                {familiar.photo ? (
                                    <img src={familiar.photo} className={`${style.card_img_top }`} alt="..." />
                                ) : (
                                    <img src={profileImg} className={`${style.card_img_top }`} alt="..." />
                                )}
                            </div>
                        </div>

                        <div className="col align-content-center">
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="alias" className="form-label fs-5">Alias:<strong> {familiar.alias}</strong> </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fs-5">Nombre: <strong> {familiar.name} </strong> </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label fs-5">Apellidos: <strong>  {familiar.lastname} </strong> </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr></hr>





                    {/* Fecha de nacimiento y edad */}
                    <div className="mb-3">
                        <div className="row">
                            <div className="col-8">
                                <label htmlFor="birthdate" className="fs-5">Fecha de nacimiento: {formatDate(familiar.birthdate)}</label><br></br>
                            </div>
                            <div className="col">
                                <label htmlFor="edad" className="fs-5">Edad:  </label>
                                <label htmlFor="edad" className="fs-5"> {calcularEdad(familiar.birthdate)} </label>
                            </div>
                        </div>
                    </div>


                    {/* Selección de grado de dependencia */}
                    <div className="mb-5">
                        <label
                            htmlFor="dependencia"
                            className="form-label fs-5">Grado de dependencia: <strong>{familiar.dependency}</strong> </label>
                        <p className="text-muted">
                            {nivelDepDescripcion(familiar.dependency)}
                        </p>
                    </div>



                    {/* Localidad y provincia */}
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label fs-5">Localidad: {familiar.location} </label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row mb-3">
                                <label htmlFor="province" className="form-label fs-5">Provincia: {familiar.province}</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label fs-5">Telefono: {familiar.phone} </label>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fs-5">Otra información importante: {familiar.description}  </label>
                    </div>
                </form >
            </div>
        </div>
    )

}