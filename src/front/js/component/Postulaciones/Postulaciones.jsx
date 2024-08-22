import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Postulaciones.module.css"
import { Context } from "../../store/appContext";


export const Postulaciones = ({ }) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getAdFavs();
    }, []);

    return (
        <>
            <div className={`container bg-light p-4 my-5 rounded ${styles.block_postulaciones}`}>
                <ul className={`nav nav-pills ${styles.nav_pills_edit} mb-3`} id="pills-tab" role="tablist">

                    {/* Mis postulaciones */}
                    <li className="nav-item" role="presentation">
                        <button className={`btn active fs-5 ${styles.button_tab}`} id="pills-postulaciones-tab" data-bs-toggle="pill" data-bs-target="#pills-postulaciones" type="button" role="tab" aria-controls="pills-postulaciones" aria-selected="true" >Mis postulaciones</button>
                    </li>

                    {/* Mis favoritos */}
                    <li className="nav-item" role="presentation">
                        <button className={`btn fs-5 ${styles.button_tab}`} id="pills-fav-tab" data-bs-toggle="pill" data-bs-target="#pills-fav" type="button" role="tab" aria-controls="pills-fav" aria-selected="false">Favoritos</button>
                    </li>

                </ul>

                {/* Inicio Tabla */}
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active table-responsive" id="pills-postulaciones" role="tabpanel" aria-labelledby="pills-postulaciones-tab" tabIndex="0">

                        <table className="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Anuncio</th>
                                    <th scope="col">Ubicación</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="">
                                        <span className="fa-solid fa-eye pe-3"></span>
                                        <span className="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="tab-pane fade table-responsive" id="pills-fav" role="tabpanel" aria-labelledby="pills-fav-tab" tabIndex="0">
                        <table className="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Anuncio</th>
                                    <th scope="col">Fecha de inicio</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(store.favDataAds) && store.favDataAds.length > 0 ? (
                                    store.favDataAds.map((fav, index) => (
                                        <tr key={fav.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{fav.ad.title}</td>
                                            <td>{new Date(fav.ad.start_date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</td>
                                            <td>{fav.ad.status === "ok" ? <span className="text-success">Activo</span> : <span className="text-secondary">Finalizado</span>}</td>
                                            <td className="text-end">
                                                <Link to={`/anuncio/${fav.ad_id}`}>
                                                    <span className="fa-solid fa-eye pe-3 text-dark"></span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No tienes favoritos guardados</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}