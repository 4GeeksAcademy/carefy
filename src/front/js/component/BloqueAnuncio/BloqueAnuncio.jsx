import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BloqueAnuncio.module.css"
import { Context } from "../../store/appContext";
import profileImg from "../../../img/profileImg.png"

export const BloqueAnuncio = ({ }) => {

    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [PostularseVisible, setPostularseVisible] = useState(true);

    useEffect(() => {
        if (id) {
            actions.getSingleAd(id);
        }
    }, [id]);

    useEffect(() => {
        // Redirigir al home si el anuncio es "pending" o "rejected" y el usuario no es el creador
        if (
            store.singleAd &&
            (store.singleAd.status === "pending" || store.singleAd.status === "rejected") &&
            store.singleAd.user_id !== store.userData.userId
        ) {
            navigate('/listado-anuncios');
        }
    }, [store.singleAd, store.userData.userId, navigate]);

    // Obtener los datos del anuncio del store
    const ad = store.singleAd;

    if (!ad) {
        return <p>Cargando...</p>;
    }

    const handlePostularseClick = () => {
        setPostularseVisible(false); // Oculta "POSTULARSE"
    };

    const handleCancelarClick = () => {
        setPostularseVisible(true); // Oculta "CANCELAR POSTULACIÓN"
    };

    const handleDelete = (id) => {
        actions.deleteAd(id);
        navigate('/mis-anuncios')
    }

    const handleEditAd = (id) => {
        console.log("Editing ad with ID:", id);
        actions.getSingleAd(id);
        navigate(`/edit-ad/${id}`);
    };

    useEffect(() => {
        actions.getPatients();
    }, []);

    const patientData = store.patients.find(patient => patient.id === store.singleAd.patient_id);

    const getAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (

        (store.singleAd.status === "pending" || store.singleAd.status === "rejected") && store.singleAd.user_id === store.userData.userId ? (
            <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
                {/* ICONO PARA EL ACOMPAÑANTE */}
                {store.userData.role == "companion" ?
                    <span className={`fa-regular fa-heart position-absolute ${styles.fav_icon}`}></span>
                    :
                    ''
                }

                {/* ICONOS PARA EL USUARIO (FAMILIAR) */}
                {store.singleAd.user_id === store.userData.userId ?
                    <div className={`position-absolute ${styles.fav_icon}`}>
                        <span onClick={() => handleEditAd(store.singleAd.id)} className="fa-solid fa-pencil pe-3"></span>
                        <span className="fa-regular fa-trash-can" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></span>

                        <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-body fw-bold fs-4">
                                        ¿Desea eliminar el anuncio?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                        <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(store.singleAd.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : ""
                }
                <h1 className="mb-5 pe-5 me-5 text-dark">{store.singleAd.title}</h1>
                <div className="d-flex align-items-start justify-content-between flex-wrap">
                    <div className="d-flex align-items-center flex-wrap">
                        <div className={`${styles.avatar} rounded`}>
                            {patientData.photo ?
                                <img src={patientData.photo} className={`img-fluid`} />
                                :
                                <img src={profileImg} className={`img-fluid`} />}
                        </div>
                        <div className="ms-3 fs-4 mt-3">
                            <p className="fs-4"><span className="fa-solid fa-user pe-2"></span><span className="pe-2">{patientData.name}</span>{patientData.lastname}</p>
                            <p className="fs-4"><span className="fa-solid fa-id-card pe-2"></span>{getAge(patientData.birthdate)} años</p>
                            <p className="fs-4"><span className="fa-solid fa-location-dot pe-2"></span>{patientData.location}, {patientData.province}</p>
                        </div>
                    </div>
                    {/* BOTON POSTULARSE/CANCELAR POSTULACION PARA ACOMPAÑANTES */}
                    {store.userData.role == "companion" && PostularseVisible ? (
                        <button
                            className={`btn ${styles.btn_postularse} fs-4 fw-bold`}
                            onClick={handlePostularseClick}
                        >
                            POSTULARSE
                        </button>
                    ) : store.userData.role == "companion" ? (
                        <button
                            className={`btn ${styles.btn_cancel_postularse} fs-4 fw-bold`}
                            onClick={handleCancelarClick}
                        >
                            CANCELAR POSTULACIÓN
                        </button>
                    ) : store.singleAd.user_id === store.userData.userId ? <p className="fs-4 fw-bold">Estado: {store.singleAd.status === "pending" ? <span className="bg-warning p-2 rounded">Pendiente</span> : store.singleAd.status === "ok" ? <span className={`${styles.status_ok} p-2 rounded text-light`}>Publicado</span> : <span className={`${styles.status_rejected} p-2 rounded text-light`}>Rechazado</span>}</p> : ""}
                </div>
                <div className="pt-4">
                    <p className="fs-5">{store.singleAd.description}</p>
                </div>
                <div className="pt-3 row">
                    <div className="col-12 col-sm-7">
                        <p className="fs-4 fw-bold"><span className="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
                        <div className="d-flex fs-5 gap-5 align-items-baseline">
                            <div className="d-flex gap-4 flex-wrap">
                                <p className="ps-4 ms-3">Tipo de servicio: <span className="text-secondary">{store.singleAd.type}</span></p>
                                <p>Inicio: <span className="text-secondary">{new Date(store.singleAd.start_date).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</span></p>
                                <p>Finalización: <span className="text-secondary">{new Date(store.singleAd.end_date).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-5">
                        <p className="fs-4 fw-bold"><span className="fa-solid fa-coins pe-3"></span>Pago (hora)</p>
                        <p className="fs-4 ps-4 ms-3">{store.singleAd.max_cost}€</p>
                    </div>
                </div>
                <div className="pt-4 row">
                    <div className="col-12 col-sm-7">
                        <p className="fs-4 fw-bold"><span className="fa-solid fa-person-circle-exclamation pe-3"></span>Observaciones</p>
                        <div className="d-flex fs-5">
                            <div className="pb-3">
                                <p className="fs-5 ps-4 ms-3">{patientData.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-5">
                        <p className="fs-4 fw-bold"><span className="fa-solid fa-wheelchair pe-3"></span>Nivel de dependencia</p>
                        <p className="fs-4 ps-4 ms-3">{patientData.dependency}</p>
                        <p className="text-secondary ps-4 ms-3 fst-italic">
                            {patientData.dependency === "Nivel 1" ? "Acompañamiento. Es independiente en tareas diarias y personales"
                                :
                                patientData.dependency === "Nivel 2" ? "Dependencia leve. Requiere ayuda para cosas puntuales en algún momento del día para la rutina o autonomía personal"
                                    :
                                    patientData.dependency === "Nivel 3" ? "Dependencia moderada. Requiere ayuda para actividades básicas, dos o tres veces al día"
                                        :
                                        "Dependencia severa. Necesita el apoyo indispensable de otra persona por pérdida de autonómia física, mental o intelectual"
                            }
                        </p>
                    </div>
                </div>
                {store.singleAd.user_id === store.userData.userId ?
                    <>
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
                                        <th scope="col"></th>
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
                                        <td className="text-end">
                                            <span className="fa-solid fa-eye pe-3"></span>
                                            <span className="fa-solid fa-trash-can pb-2"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </> : ""
                }
            </div>)
            :
            store.singleAd.status === "ok" ? (
                <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
                    {/* ICONO PARA EL ACOMPAÑANTE */}
                    {store.userData.role == "companion" ?
                        <span className={`fa-regular fa-heart position-absolute ${styles.fav_icon}`}></span>
                        :
                        ''
                    }

                    {/* ICONOS PARA EL USUARIO (FAMILIAR) */}
                    {store.singleAd.user_id === store.userData.userId ?
                        <div className={`position-absolute ${styles.fav_icon}`}>
                            <span onClick={() => handleEditAd(store.singleAd.id)} className="fa-solid fa-pencil pe-3"></span>
                            <span className="fa-regular fa-trash-can" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></span>

                            <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body fw-bold fs-4">
                                            ¿Desea eliminar el anuncio?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                            <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(store.singleAd.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> : ""
                    }
                    <h1 className="mb-5 pe-5 me-5 text-dark">{store.singleAd.title}</h1>
                    <div className="d-flex align-items-start justify-content-between flex-wrap">
                        <div className="d-flex align-items-center flex-wrap">
                            <div className={`${styles.avatar} rounded`}>
                                {patientData.photo ?
                                    <img src={patientData.photo} className={`img-fluid`} />
                                    :
                                    <img src={profileImg} className={`img-fluid`} />}
                            </div>
                            <div className="ms-3 fs-4 mt-3">
                                <p className="fs-4"><span className="fa-solid fa-user pe-2"></span><span className="pe-2">{patientData.name}</span>{patientData.lastname}</p>
                                <p className="fs-4"><span className="fa-solid fa-id-card pe-2"></span>{getAge(patientData.birthdate)} años</p>
                                <p className="fs-4"><span className="fa-solid fa-location-dot pe-2"></span>{patientData.province}</p>
                            </div>
                        </div>
                        {/* BOTON POSTULARSE/CANCELAR POSTULACION PARA ACOMPAÑANTES */}
                        {store.userData.role == "companion" && PostularseVisible ? (
                            <button
                                className={`btn ${styles.btn_postularse} fs-4 fw-bold`}
                                onClick={handlePostularseClick}
                            >
                                POSTULARSE
                            </button>
                        ) : store.userData.role == "companion" ? (
                            <button
                                className={`btn ${styles.btn_cancel_postularse} fs-4 fw-bold`}
                                onClick={handleCancelarClick}
                            >
                                CANCELAR POSTULACIÓN
                            </button>
                        ) : store.singleAd.user_id === store.userData.userId ? <p className="fs-4 fw-bold">Estado: {store.singleAd.status === "pending" ? <span className="bg-warning p-2 rounded">Pendiente</span> : store.singleAd.status === "ok" ? <span className={`${styles.status_ok} p-2 rounded text-light`}>Publicado</span> : <span className="bg-danger p-2 rounded text-light">Rechazado</span>}</p> : ""}
                    </div>
                    <div className="pt-4">
                        <p className="fs-5">{store.singleAd.description}</p>
                    </div>
                    <div className="pt-3 row">
                        <div className="col-12 col-sm-7">
                            <p className="fs-4 fw-bold"><span className="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
                            <div className="d-flex fs-5 gap-5 align-items-baseline">
                                <div className="d-flex gap-4 flex-wrap">
                                    <p className="ps-4 ms-3">Tipo de servicio: <span className="text-secondary">{store.singleAd.type}</span></p>
                                    <p>Inicio: <span className="text-secondary">{new Date(store.singleAd.start_date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</span></p>
                                    <p>Finalización: <span className="text-secondary">{new Date(store.singleAd.end_date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-5">
                            <p className="fs-4 fw-bold"><span className="fa-solid fa-coins pe-3"></span>Pago (hora)</p>
                            <p className="fs-4 ps-4 ms-3">{store.singleAd.max_cost}€</p>
                        </div>
                    </div>
                    <div className="pt-4 row">
                        <div className="col-12 col-sm-7">
                            <p className="fs-4 fw-bold"><span className="fa-solid fa-person-circle-exclamation pe-3"></span>Observaciones</p>
                            <div className="d-flex fs-5">
                                <div className="pb-3">
                                    <p className="fs-5 ps-4 ms-3">{patientData.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-5">
                            <p className="fs-4 fw-bold"><span className="fa-solid fa-wheelchair pe-3"></span>Nivel de dependencia</p>
                            <p className="fs-4 ps-4 ms-3">{patientData.dependency}</p>
                            <p className="text-secondary ps-4 ms-3 fst-italic">
                                {patientData.dependency === "Nivel 1" ? "Acompañamiento. Es independiente en tareas diarias y personales"
                                    :
                                    patientData.dependency === "Nivel 2" ? "Dependencia leve. Requiere ayuda para cosas puntuales en algún momento del día para la rutina o autonomía personal"
                                        :
                                        patientData.dependency === "Nivel 3" ? "Dependencia moderada. Requiere ayuda para actividades básicas, dos o tres veces al día"
                                            :
                                            "Dependencia severa. Necesita el apoyo indispensable de otra persona por pérdida de autonómia física, mental o intelectual"
                                }
                            </p>
                        </div>
                    </div>
                    {store.singleAd.user_id === store.userData.userId ?
                        <>
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
                                            <th scope="col"></th>
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
                                            <td className="text-end">
                                                <span className="fa-solid fa-eye pe-3"></span>
                                                <span className="fa-solid fa-trash-can pb-2"></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </> : ""
                    }
                </div>) : ""
    )
}