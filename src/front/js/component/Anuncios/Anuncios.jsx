import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from "./Anuncios.module.css"

export const Anuncios = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getUserAds();
        actions.getCompanionFavs();
        actions.companion();
        actions.getCompanions()
        actions.getCompanionRate(store.oneCompanion.id);
    }, []);

    const handleDelete = (id) => {
        actions.deleteAd(id);
        actions.getUserAds();
    }

    const verAnuncio = (id) => {
        navigate(`/anuncio/${id}`)
        window.scrollTo(0, 0);

    }

    const verPerfil = () => {
        window.scrollTo(0, 0);
    }


    return (
        <>
            <div className={`container bg-light p-4 my-5 rounded ${styles.block_anuncios}`}>
                <div className="d-flex justify-content-between align-items-start">
                    <ul className={`nav nav-pills ${styles.nav_pills_edit} mb-3`} id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`btn active fs-5 ${styles.button_tab}`} id="pills-postulaciones-tab" data-bs-toggle="pill" data-bs-target="#pills-postulaciones" type="button" role="tab" aria-controls="pills-postulaciones" aria-selected="true" >Mis anuncios</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`btn fs-5 ${styles.button_tab}`} id="pills-fav-tab" data-bs-toggle="pill" data-bs-target="#pills-fav" type="button" role="tab" aria-controls="pills-fav" aria-selected="false">Perfiles favoritos</button>
                        </li>
                    </ul>
                    <Link to="/crear-anuncio"><button className={`${styles.post_ad} btn btn-success`}>Publicar anuncio</button></Link>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active table-responsive" id="pills-postulaciones" role="tabpanel" aria-labelledby="pills-postulaciones-tab" tabIndex="0">

                        <table className="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Anuncio</th>
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
                                            <td>{new Date(ad.created_at).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}</td>
                                            <td>{ad.status === "pending" ? <span className={styles.pendiente}>Pendiente</span> : ad.status === "ok" ? <span className="text-success">Publicado</span> : ad.status === "rejected" ? <span className="text-danger">Rechazado</span> : <span className="text-secondary">Finalizado</span>}</td>
                                            <td className="text-end">
                                                <span onClick={() => verAnuncio(ad.id)} className={`fa-solid fa-eye pe-3 ${styles.ad_icons}`}></span>

                                                <span className={`fa-solid fa-trash-can pb-2 ${styles.ad_icons}`} type="button" data-bs-toggle="modal" data-bs-target={`#deleteModal-${ad.id}`}></span>

                                                
                                                <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id={`deleteModal-${ad.id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${ad.id}`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="text-start modal-body fw-bold fs-4">
                                                                ¿Desea eliminar el anuncio?
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                                                <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(ad.id)}>Eliminar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                    <th scope="col">Ubicación</th>
                                    <th scope="col">Email</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(store.favData) && store.favData.length > 0 ? (
                                    store.favData.map((fav, index) => (
                                        <tr key={fav.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{fav.companion?.user?.name} {fav.companion?.user?.lastname}</td>
                                            <td>{fav.companion?.user?.location}, {fav.companion?.province}</td>
                                            <td>{fav.companion?.user?.email}</td>
                                            
                                            <td className="text-end">
                                                <Link onClick={verPerfil} to={`/perfil-profesional/${fav.companion_id}`}>
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
            </div >
        </>
    )
}