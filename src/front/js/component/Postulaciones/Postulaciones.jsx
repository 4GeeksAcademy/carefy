import React from "react";
import styles from "./Postulaciones.module.css"

export const Postulaciones = ({ countAds, title, location, date, countFav, favTitle, favLocation, favDate }) => {
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
                           z </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{countAds}</th>
                                    <td>{title}</td>
                                    <td>{location}</td>
                                    <td>{date}</td>
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
                                    <th scope="col">Ubicación</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{countFav}</th>
                                    <td>{favTitle}</td>
                                    <td>{favLocation}</td>
                                    <td>{favDate}</td>
                                    <td className="">
                                        <span className="fa-solid fa-eye pe-3"></span>
                                        <span className="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}