import React, { useContext, useState, useEffect } from "react";
import styles from "./BloqueAnuncio.module.css"
import { Context } from "../../store/appContext";


export const BloqueAnuncio = ({ adId }) => {

    const { store, actions } = useContext(Context);

    const [PostularseVisible, setPostularseVisible] = useState(true);

    useEffect(() => {
        if (adId) {
            actions.getSingleAd(adId);
        }
    }, [adId, actions]);

    // Obtener los datos del anuncio del store
    const ad = store.adData;

    if (!ad) {
        return <p>Cargando...</p>; // Mostrar un mensaje de carga si los datos aún no están disponibles
    }

    // Datos del anuncio
    const {
        title,
        avatar,
        userName,
        age,
        location,
        description,
        availability,
        startDate,
        endDate,
        price,
        task,
        dependency,
        observations
    } = ad;

    const handlePostularseClick = () => {
        setPostularseVisible(false); // Oculta "POSTULARSE"
    };

    const handleCancelarClick = () => {
        setPostularseVisible(true); // Oculta "CANCELAR POSTULACIÓN"
    };

    return (
        <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
            {/* ICONO PARA EL ACOMPAÑANTE */}
            {store.userData.role == "companion" ?
                <span className={`fa-regular fa-heart position-absolute ${styles.fav_icon}`}></span>
                :
                ''
            }

            {/* ICONOS PARA EL USUARIO (FAMILIAR) */}
            {/* <div className={`position-absolute ${styles.fav_icon}`}>
                <span className="fa-solid fa-pencil pe-3"></span>
                <span className="fa-regular fa-trash-can"></span>
            </div> */}
            <h1 className="mb-5 pe-5 me-3">{title}</h1>
            <div className="d-flex align-items-start justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-wrap">
                    <div className={`${styles.avatar} rounded`}>
                        <img src={avatar} className={`img-fluid`} />
                    </div>
                    <div className="ms-3 fs-4 mt-3">
                        <p className=""><span className="fa-solid fa-user pe-3"></span>{userName}</p>
                        <p><span className="fa-solid fa-id-card pe-3"></span>{age}</p>
                        <p><span className="fa-solid fa-location-dot pe-1"></span>{location}</p>
                    </div>
                </div>
                {/* BOTON POSTULARSE/CANCELAR POSTULACION PARA ACOMPAÑANTES */}
                {PostularseVisible ? (
                    <button
                        className={`btn ${styles.btn_postularse} fs-4 fw-bold`}
                        onClick={handlePostularseClick}
                    >
                        POSTULARSE
                    </button>
                ) : (
                    <button
                        className={`btn ${styles.btn_cancel_postularse} fs-4 fw-bold`}
                        onClick={handleCancelarClick}
                    >
                        CANCELAR POSTULACIÓN
                    </button>
                )}
            </div>
            <div className="pt-4">
                <p className="fs-5">{description}</p>
            </div>
            <div className="pt-3 row">
                <div className="col-12 col-sm-7">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
                    <div className="d-flex fs-5 gap-5 align-items-baseline">
                        <div>
                            <p className="ps-4 ms-3 fs-4">{availability}</p>
                        </div>
                        <div className="d-flex gap-3 flex-wrap">
                            <p>Inicio: <span className="text-secondary">{startDate}</span></p>
                            <p>Finalización: <span className="text-secondary">{endDate}</span></p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-5">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-coins pe-3"></span>Pago (hora)</p>
                    <p className="fs-4 ps-4 ms-3">{price}</p>
                </div>
            </div>
            <div className="pt-4 row">
                <div className="col-12 col-sm-7">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-list-check pe-3"></span>Tareas principales</p>
                    <div className="d-flex fs-5">
                        <div className="ps-4 ms-3 pb-3">
                            <li>{task}</li>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-5">
                    <p className="fs-4 fw-bold"><span className="fa-solid fa-wheelchair pe-3"></span>Nivel de dependencia</p>
                    <p className="fs-4 ps-4 ms-3">{dependency}<span className="text-secondary italic fst-italic fs-5 ps-2"></span></p>
                    <p className="fs-5 ps-4 ms-3"><span className="fst-italic">Observaciones</span>: {dependency}</p>
                </div>
            </div>
            <p className="fs-4 fw-bold">Solicitudes</p>
            <div className="table-responsive">
                <table className="table table-hover table-light">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Experiencia</th>
                            <th scope="col">Costo (hora)</th>
                            <th scope="col">Valoración</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}