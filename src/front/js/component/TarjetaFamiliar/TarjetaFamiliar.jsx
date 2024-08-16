import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "../../../img/profileImg.png"

export const TarjetaFamiliar = ({ familiar }) => {
    console.log('familiar card ', familiar);



    return (

        <div className="card" style={{ width: '15rem' }}>
            <h5 className="card-title text-center pt-2">{familiar.alias}</h5>

            {/* Si el usuario ha subido una foto, se pinta la foto. Si no, se pinta el muñeco */}
            {familiar.photo ? (
                <img src={familiar.photo} className="card-img-top" alt="..." />
            ) : (
                <img src={profileImg} className="card-img-top" alt="..." />
            )}

            <div className="card-body">
                <div className="row text-center">

                    {/* Al pulsar este botón se abrirá la ventana modal del usuario con los campos bloqueados en sólo lectura */}
                    <div className="col">
                        <button type="button" className="btn btn-light"
                            data-bs-toggle="modal" data-bs-target="#mostrarFamiliar">

                            <span className="fa-solid fa-eye fs-5"></span>
                        </button>

                        {/* <!-- Modal --> */}
                        <div className={`modal fade`} id="mostrarFamiliar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Familiar: {familiar.alias}</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Formulario */}
                                        <form className="form p-4">

                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        {familiar.photo ? (
                                                            <img src={familiar.photo} className="card-img-top" alt="..." />
                                                        ) : (
                                                            <img src={profileImg} className="card-img-top" alt="..." />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="mb-3">
                                                            <label htmlFor="alias" className="form-label fs-5">Alias: {familiar.alias} </label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label htmlFor="name" className="form-label fs-5">Nombre: {familiar.name} </label>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label htmlFor="lastname" className="form-label fs-5">Apellidos: {familiar.lastname} </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>











                                            <div className="mb-3">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <label htmlFor="birthdate" className="fs-5">Fecha de nacimiento: {familiar.birthdate}</label><br></br>
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





                                            <div className="mb-3">
                                                <label htmlFor="location" className="form-label fs-5">Localidad: {familiar.location} </label>
                                            </div>

                                            {/* Select provincias */}
                                            <div className="row mb-3">
                                                <label htmlFor="province" className="form-label fs-5">Provincia: {familiar.province}</label>
                                            </div>






                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label fs-5">Telefono: {familiar.phone} </label>
                                            </div>












                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label fs-5">Otra información importante: {familiar.description}  </label>
                                            </div>

                                            {/* <div>
                                                <button type="submit" className={`btn fs-5 ${style.botonGuardar}`} >Guardar usuario</button>
                                            </div> */}
                                        </form >
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Al pulsar en este campo se abrirá el modal del usuario con los campos editables */}
                    <div className="col">
                        <button type="button" className="btn btn-light">
                            <span className="fa-solid fa-pencil fs-5"></span>
                        </button>
                    </div>


                    <div className="col">
                        <button type="button" className="btn btn-light">
                            <span className="fa-solid fa-trash-can fs-5"></span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}