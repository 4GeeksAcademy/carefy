import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from "./Anuncios.module.css"

export const Anuncios = ({ countAds, title, requests, date, countFav, companionName }) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getUserAds();
    }, []);

    const handleDelete = (id) => {
        actions.deleteAd(id);
        actions.getUserAds();
    }

    const verAnuncio = (id) => {
        navigate(`/anuncio/${id}`)
    }

    return (
        <>
            <div className={`container bg-light p-4 my-5 rounded ${styles.block_anuncios}`}>
                <ul className={`nav nav-pills ${styles.nav_pills_edit} mb-3`} id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={`btn active fs-5 ${styles.button_tab}`} id="pills-postulaciones-tab" data-bs-toggle="pill" data-bs-target="#pills-postulaciones" type="button" role="tab" aria-controls="pills-postulaciones" aria-selected="true" >Mis anuncios</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`btn fs-5 ${styles.button_tab}`} id="pills-fav-tab" data-bs-toggle="pill" data-bs-target="#pills-fav" type="button" role="tab" aria-controls="pills-fav" aria-selected="false">Favoritos</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active table-responsive" id="pills-postulaciones" role="tabpanel" aria-labelledby="pills-postulaciones-tab" tabIndex="0">

                        <table className="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Anuncio</th>
                                    <th scope="col">Solicitudes</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(store.adData) ? (
                                    store.adData.map((ad, index) => (

                                        <tr key={ad.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{ad.title}</td>
                                            <td>{ad.description}</td>
                                            <td>{new Date(ad.created_at).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</td>
                                            <td>{ad.status === "pending" ? "Pendiente" : ad.status === "ok" ? "Publicado" : "Rechazado"}</td>
                                            <td className="text-end">
                                                <span onClick={() => verAnuncio(ad.id)} className={`fa-solid fa-eye pe-3 ${styles.ad_icons}`}></span>
                                                <span onClick={() => handleDelete(ad.id)} className={`fa-solid fa-trash-can pb-2 ${styles.ad_icons}`}></span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No tienes anuncios creados o activos</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    <div className="tab-pane fade table-responsive" id="pills-fav" role="tabpanel" aria-labelledby="pills-fav-tab" tabIndex="0">
                        <table className="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{countFav}</th>
                                    <td>{companionName}</td>
                                    <td className="text-end">
                                        <span className="fa-solid fa-eye pe-3"></span>
                                        <span className="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}