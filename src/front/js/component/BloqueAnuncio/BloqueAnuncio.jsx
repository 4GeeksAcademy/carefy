import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./BloqueAnuncio.module.css"
import { Context } from "../../store/appContext";
import profileImg from "../../../img/profileImg.png"

export const BloqueAnuncio = ({ }) => {

    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [PostularseVisible, setPostularseVisible] = useState(true);
    const [listaInscripciones, setListaInscripciones] = useState([])
    const [companion_id, setCompanion_id] = useState(0)

    //Obtiene un anuncio a través del id
    useEffect(() => {
        if (id) {
            actions.getSingleAd(id);
        }
    }, [id]);

    //Si existe un anuncio y su estado es "pendiente", "rechazado" o "finalizado" y además el id del anuncio no es igual
    // que el usuario logueado --> redirige a listado-anuncios.
    // De lo contrario accede al anuncio. 
    useEffect(() => {
        // Redirigir al home si el anuncio es "pending" o "rejected" y el usuario no es el creador
        if (
            store.singleAd &&
            (store.singleAd.status === "pending" || store.singleAd.status === "rejected" || store.singleAd.status === "finish") &&
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

    /**
     * Función para crear una postulación/inscripción a un ad
     * @param userComId: buscar en el store el id del usuario logueado
     * @param adId busca el Id del anuncio. 
     * @param companions: obtenemos la lista de companions del storage
     * @param companionsParsed: obtiene la lista anterior en un formato JSON
     * -forEach: recorre la lista companionParsed y se valida si el usuario del acompañanante (compain.user.id) es el mismo
     * que el usuario logueado(user.id), nos aseguramos acceder a  los datos del usuario logueado. 
     * Si coincide se crea inscripcionExiste, para verificar si un mismo acompañante ya está inscrito a un mismo ad.
     * Si no está inscrito se llama a la función para inscribirse y oculta el botón "postularse".
     * Si ya estuviese inscrito una vez, aparece alerta 
     */
    const handlePostularseClick = () => {

        const userCompId = store.userData.userId;
        const adId = store.singleAd.id;
        const companions = localStorage.getItem('companions');
        const companionsParsed = JSON.parse(companions)

        companionsParsed.forEach((companion) => {
            if (companion.user.id === userCompId) {
                const inscripcionExistente = store.inscripciones.find(inscripcion => inscripcion.companion_id === companion.id && inscripcion.ad_id === adId);

                if (!inscripcionExistente) {
                    actions.add_inscription(companion.id, adId, userCompId)
                        .then(() => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.error("Error al crear la inscripción:", error);
                        });
                }
            }
        });

    };




    const handleCancelarClick = () => {
        const userCompId = store.userData.userId;
        const inscriptionId = localStorage.getItem('inscripciones_lista');
        if (!inscriptionId) {
            console.error('No hay datos en localStorage para "inscripciones_lista".');
            return;
        }

        const lista_inscripciones = JSON.parse(inscriptionId);
        if (!Array.isArray(lista_inscripciones)) {
            console.error('El formato de "inscripciones_lista" no es válido.');
            return;
        }


        lista_inscripciones.forEach((inscripcion) => {
            const id_Inscripcion = store.inscripciones.find(inscr => inscr.id === inscripcion.id && inscripcion.user_id === userCompId);
            if (id_Inscripcion) {
                actions.deleteinscription(inscripcion.id);
            } else {
                console.warn(`No se encontró inscripción con ID ${inscripcion.id}`);
            }
        });
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

    // Obtiene todas las inscripciones
    useEffect(() => {
        actions.obtenerinscripciones();
        const userCompId = store.userData.userId;
        const adId = store.singleAd.id;
        const companions = localStorage.getItem('companions');
        const companionsParsed = JSON.parse(companions)

        companionsParsed.forEach((companion) => {
            if (companion.user.id === userCompId) {
                const inscripcionExistente = store.inscripciones.find(inscripcion => inscripcion.companion_id === companion.id);

                if (!inscripcionExistente) {
                    // Después de inscribirse con éxito, ocultar el botón "POSTULARSE"
                    setPostularseVisible(true);
                } else {
                    setPostularseVisible(false); // Oculta "CANCELAR POSTULACIÓN"
                }
            }
        });

    }, []);

    useEffect(() => {
        actions.getCompanions();

    }, []);

    // Función para calcular la edad a partir de la fecha de nacimiento
    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date()
        const fechaNac = new Date(fechaNacimiento);
        let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth()

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edadCalculada--;
        }
        return edadCalculada
    }


    useEffect(() => {
        const lista = store.inscripciones;
        setListaInscripciones(lista)
        console.log('listado de inscripciones disponibles', listaInscripciones);
    }, [listaInscripciones])

    const handleAddFav = async (ad_id) => {
        console.log('Data de favAd: ', store.favDataAds)
        await actions.addFavAd(ad_id);
        const updatedFavData = await actions.getAdFavs();
        const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.ad_id === store.singleAd.id);
        setFavorited(isFavorited);
    };

    const handleDeleteFav = async (favId) => {
        console.log('Data de favAd: ', store.favDataAds)
        await actions.deleteFavAd(favId);
        const updatedFavData = await actions.getAdFavs();
        const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.ad_id === store.singleAd.id);
        setFavorited(isFavorited);
    };

    const isFavorited = Array.isArray(store.favDataAds) && store.favDataAds.some(fav => fav.ad_id === store.singleAd.id);

    return (

        (store.singleAd.status === "pending" || store.singleAd.status === "rejected" || store.singleAd.status === "finish") && store.singleAd.user_id === store.userData.userId ? (
            <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
                {/* ICONO PARA EL ACOMPAÑANTE */}
                {store.userData.role === "companion" && (
                    isFavorited ? (
                        <span
                            onClick={() => {
                                const favId = store.favDataAds.find(fav => fav.ad_id === store.singleAd.id);
                                if (favId) handleDeleteFav(favId);
                            }}
                            className={`position-absolute fa-solid fa-heart ${styles.fav_icon} text-danger fs-1`}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        ></span>
                    ) : (
                        <span
                            onClick={() => handleAddFav(store.singleAd.id)}
                            className={`position-absolute fs-1 fa-regular fa-heart ${styles.fav_icon}`}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        ></span>
                    )
                )}

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
                    ) : store.singleAd.user_id === store.userData.userId ? (
                        <p className="fs-4 fw-bold">
                            Estado:{" "}
                            {store.singleAd.status === "pending" ? (
                                <span className="bg-warning p-2 rounded">Pendiente</span>
                            ) : store.singleAd.status === "ok" ? (
                                <span className={`${styles.status_ok} p-2 rounded text-light`}>Publicado</span>
                            ) : store.singleAd.status === "rejected" ? (
                                <span className={`${styles.status_rejected} p-2 rounded text-light`}>Rechazado</span>
                            ) : store.singleAd.status === "finish" ? (
                                <span className="bg-secondary p-2 rounded text-light">Finalizado</span>
                            ) : (
                                ""
                            )}
                        </p>
                    ) : null}
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
                                    {listaInscripciones.map((inscripcion) => {
                                        // Encuentra el companion correspondiente al companion_id de la inscripción
                                        const companion = store.companions.find(comp => comp.id === inscripcion.companion_id);

                                        // Si no se encuentra el companion, se omite el rendering de esa fila
                                        if (!companion) return null;

                                        // Asegúrate de obtener estos datos de la manera correcta
                                        const { id: companion_id, user, birthdate, experiencia, precio, valoracion } = companion;

                                        return (
                                            <tr key={inscripcion.id}>
                                                <th scope="row">1</th>
                                                <td>{companion?.user?.name}</td>
                                                <td>{calcularEdad(companion?.birthdate)}</td>
                                                <td>{companion?.experience}</td>
                                                <td>{companion?.service_cost}</td>
                                                <td>{valoracion}</td>
                                                <td className="text-end">
                                                    <Link to={`/perfil-profesional/${companion_id}`}>
                                                        <span className="fa-solid fa-eye pe-3"></span>
                                                    </Link>
                                                    <span className="fa-solid fa-trash-can pb-2"></span>
                                                </td>
                                            </tr>
                                        );
                                    })}
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
                    {store.userData.role === "companion" && (
                        isFavorited ? (
                            <span
                                onClick={() => {
                                    const fav = store.favDataAds.find(fav => fav.ad_id === store.singleAd.id);
                                    if (fav && fav.id) handleDeleteFav(fav.id);
                                }}
                                className={`position-absolute fa-solid fa-heart ${styles.fav_icon} text-danger fs-1`}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            ></span>
                        ) : (
                            <span
                                onClick={() => handleAddFav(store.singleAd.id)}
                                className={`position-absolute fs-1 fa-regular fa-heart ${styles.fav_icon}`}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            ></span>
                        )
                    )}

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
                        ) : store.singleAd.user_id === store.userData.userId ? (
                            <p className="fs-4 fw-bold">
                                Estado:{" "}
                                {store.singleAd.status === "pending" ? (
                                    <span className="bg-warning p-2 rounded">Pendiente</span>
                                ) : store.singleAd.status === "ok" ? (
                                    <span className={`${styles.status_ok} p-2 rounded text-light`}>Publicado</span>
                                ) : store.singleAd.status === "rejected" ? (
                                    <span className={`${styles.status_rejected} p-2 rounded text-light`}>Rechazado</span>
                                ) : store.singleAd.status === "finish" ? (
                                    <span className="bg-secondary p-2 rounded text-light">Finalizado</span>
                                ) : (
                                    ""
                                )}
                            </p>
                        ) : null}
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

                            {/* Tabla de solicitudes de acompañantes con respecto al anuncio */}
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
                                        {listaInscripciones.map((inscripcion) => {
                                            // Encuentra el companion correspondiente al companion_id de la inscripción
                                            const companion = store.companions.find(comp => comp.id === inscripcion.companion_id);

                                            // Si no se encuentra el companion, se omite el rendering de esa fila
                                            if (!companion) return null;

                                            // Asegúrate de obtener estos datos de la manera correcta
                                            const { id: companion_id, user, birthdate, experiencia, precio, valoracion } = companion;

                                            return (
                                                <tr key={inscripcion.id}>
                                                    <th scope="row">1</th>
                                                    <td>{companion?.user?.name}</td>
                                                    <td>{calcularEdad(companion?.birthdate)}</td>
                                                    <td>{companion?.experience}</td>
                                                    <td>{companion?.service_cost}</td>
                                                    <td>{valoracion}</td>
                                                    <td className="text-end">
                                                        <Link to={`/perfil-profesional/${companion_id}`}>
                                                            <span className="fa-solid fa-eye pe-3"></span>
                                                        </Link>
                                                        <span className="fa-solid fa-trash-can pb-2"></span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        </> : ""
                    }
                </div>) : ""
    )
}