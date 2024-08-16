import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../../img/profileImg.png"
import style from "../../TarjetaFamiliar/tarjetafamiliar.module.css"


export const ModalVerFamiliar = ({familiar}) => {

    // Función para cambiar el formato a dd/mm/aaaa
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }


    return(
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
                                <img src={familiar.photo} className={`card-img-top ${style.sizePhoto}`} alt="..." />
                            ) : (
                                <img src={profileImg} className={`card-img-top ${style.sizePhoto}`} alt="..." />
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
                        {/* <div className="col">
                            <label htmlFor="birthdate" className="fs-5">Edad: </label><br></br>
                            <label htmlFor="birthdate" className="fs-5">{edad} </label>

                        </div> */}
                    </div>
                </div>


                {/* Selección de grado de dependencia */}
                <div className="mb-3">
                    <label htmlFor="dependencia" className="form-label fs-5">Grado de dependencia: {familiar.dependency} </label>
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