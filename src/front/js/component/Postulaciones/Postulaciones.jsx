import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Postulaciones.module.css";
import { Context } from "../../store/appContext";

export const Postulaciones = ({ }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [inscripcionesMias, setInscripcionesMias] = useState([]);
    const [contractStatus, setContractStatus] = useState({});
    useEffect(() => {
        actions.getAdFavs();
        actions.obtenerinscripciones();
    }, []);
    const verAnuncio = () => {
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        // Filtra las inscripciones que corresponden al usuario
        const filteredInscripciones = store.inscripciones.filter(misinscripciones => misinscripciones.user_id === store.userData.userId);
        setInscripcionesMias(filteredInscripciones);
    }, [store.inscripciones, store.userData.userId]);
    /**
     * Función para cambiar el botón según el estado de la contratación que reciba. 
     * Se llama a esta función en el <td> para que vaya pintando el estado en cada fila 
     * @param {statusContract}
     * @returns "botón según estado"
     */
    const getStatusButton = (statusContract) => {
        switch (statusContract) {
            case 'pending':
                return <span className={`${styles.pendiente} ps-4 fw-bold`} >Pendiente</span>;
            case 'rejected':
                return <span className={`text-danger ps-4 fw-bold`} >Rechazado</span>;
            case 'ok':
                return <span className={`text-success ps-4 fw-bold`}>Contratado</span>;
            default:
                return '';
        }
    };
    return (
        <>
            <div className={`container bg-light p-4 my-5 rounded ${styles.block_postulaciones}`}>
                <ul className={`nav nav-pills ${styles.nav_pills_edit} mb-3`} id="pills-tab" role="tablist">
                    {/* Mis postulaciones */}
                    <li className="nav-item" role="presentation">
                        <button className={`btn active fs-5 ${styles.button_tab}`} id="pills-postulaciones-tab" data-bs-toggle="pill" data-bs-target="#pills-postulaciones" type="button" role="tab" aria-controls="pills-postulaciones" aria-selected="true">Mis postulaciones</button>
                    </li>
                    {/* Mis favoritos */}
                    <li className="nav-item" role="presentation">
                        <button className={`btn fs-5 ${styles.button_tab}`} id="pills-fav-tab" data-bs-toggle="pill" data-bs-target="#pills-fav" type="button" role="tab" aria-controls="pills-fav" aria-selected="false">Favoritos</button>
                    </li>
                </ul>
                {/* Inicio Tabla */}
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active table-responsive" id="pills-postulaciones" role="tabpanel" aria-labelledby="pills-postulaciones-tab" tabIndex="0">
                        {/* Tabla Mis Postulaciones */}
                        <table className="table table-light table-hover">
                            <thead>
                                <tr className="">
                                    <th scope="col">#</th>
                                    <th scope="col">Anuncio</th>
                                    <th scope="col">Ubicación</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Estado postulacion</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {inscripcionesMias.map((misinscripciones, index) => {
                                    const anuncio = store.ads.find(ad => ad.id === misinscripciones.ad_id);
                                    const paciente = store.patients.find(patient => patient.id === anuncio?.patient_id);

                                    if (!anuncio || !paciente) return null;

                                    return (
                                        <tr key={misinscripciones.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{anuncio.title}</td>
                                            <td>{paciente.province}</td>
                                            <td>{new Date(anuncio.start_date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</td>
                                            <td>
                                                {getStatusButton(misinscripciones.statusContract)}
                                            </td>
                                            <td className="text-end">
                                                <Link to={`/anuncio/${anuncio.id}`}><span className="fa-solid fa-eye text-dark text-end"></span></Link>
                                            </td>

                                        </tr>
                                    );
                                })}
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
                                                <Link onClick={verAnuncio} to={`/anuncio/${fav.ad_id}`}>
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
    );
}