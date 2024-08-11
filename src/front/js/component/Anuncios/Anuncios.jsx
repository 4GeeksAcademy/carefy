import React from "react";
import styles from "./Anuncios.module.css"

export const Anuncios = ({ }) => {
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
                    <div className="tab-pane fade show active table-responsive" id="pills-postulaciones" role="tabpanel" aria-labelledby="pills-postulaciones-tab" tabindex="0">

                        <table class="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Anuncio</th>
                                    <th scope="col">Solicitudes</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Se necesita cuidadora para hombre de 91 años</td>
                                    <td>Madrid</td>
                                    <td>01/05/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Busco acompañanate para mi abuela zona Nervión, Sevilla</td>
                                    <td>Sevilla</td>
                                    <td>30/08/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Se busca cuidador para hombre de 88 años para fines de semana</td>
                                    <td>Velencia</td>
                                    <td>21/12/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Se necesita cuidadora para hombre de 91 años</td>
                                    <td>Madrid</td>
                                    <td>01/05/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Busco acompañanate para mi abuela zona Nervión, Sevilla</td>
                                    <td>Sevilla</td>
                                    <td>30/08/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Se busca cuidador para hombre de 88 años para fines de semana</td>
                                    <td>Velencia</td>
                                    <td>21/12/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="tab-pane fade table-responsive" id="pills-fav" role="tabpanel" aria-labelledby="pills-fav-tab" tabindex="0">
                    <table class="table table-light table-hover">
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
                                    <th scope="row">1</th>
                                    <td>Se necesita cuidadora para hombre de 91 años</td>
                                    <td>Madrid</td>
                                    <td>01/05/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Busco acompañanate para mi abuela zona Nervión, Sevilla</td>
                                    <td>Sevilla</td>
                                    <td>30/08/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Se busca cuidador para hombre de 88 años para fines de semana</td>
                                    <td>Velencia</td>
                                    <td>21/12/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Se necesita cuidadora para hombre de 91 años</td>
                                    <td>Madrid</td>
                                    <td>01/05/2024</td>
                                    <td className="">
                                        <span class="fa-solid fa-eye pe-3"></span>
                                        <span class="fa-solid fa-trash-can pb-2"></span>
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