import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import styles from "./BloqueAnuncio.module.css"
import { Context } from "../../store/appContext";
import profileImg from "../../../img/profileImg.png"

export const BloqueAnuncio = ({ }) => {

    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [PostularseVisible, setPostularseVisible] = useState(true);
    const [listaInscripciones, setListaInscripciones] = useState([])
    const [companion_id, setCompanion_id] = useState(0)
    const [change, setChange] = useState(false)
    const [botonValorarVisible, setBotonValorarVisible] = useState(false)
    const [contratoActivo, setContratoActivo] = useState(null);

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


    // FUNCIONA //  
    const handlePostularseClick = async () => {
        const userCompId = store.userData.userId;
        const adId = store.singleAd.id;
        const patients = store.patients;
        const companions = localStorage.getItem('companions');
        const companionsParsed = JSON.parse(companions)
        setPostularseVisible(false)

        console.log(('patients...', patients));
        const companionExistente = companionsParsed.find(companion =>
            companion.user_id === userCompId
        )
        const inscripcionExistente = store.inscripciones.find(inscripcion => inscripcion.user_id === userCompId && inscripcion.ad_id === adId);

        if (companionExistente && !inscripcionExistente) {
            try {
                await actions.add_inscription(companionExistente.id, adId, userCompId)

            } catch (error) {
                console.error('Error al añadir la inscripcion', error)
            } finally {
                // window.location.reload()
            }
        }
    };


    /**
     * 
     * @param adId: obtiene el id del anuncio
     * @param  userCompId: obtiene el id del usuario que se ha logueado. 
     * @param inscriptionId:  Obtiene todas las inscripciones desde localStorage. Si no hubiese inscripciones lanza un error. 
     * @oparam lista_inscripciones: pasa a formato json la lista de inscripciones. Si lo que devuelve no es un array, lanza un error. 
     * @param inscripcionAEliminar: busca en la lista (dentro de la inscripción) que el id del acompañante de la inscripción sea igual
     * que el el acompañante logueado, y que el id del anuncio de la inscripción sea igual al del anuncio que estamos viendo. 
     * Si lo anterior se cumple, llama a la función para eliminar la inscripción, y vuelve a poner el botón de postularse en visible. 
     */
    const handleCancelarClick = async () => {
        const adId = store.singleAd.id;
        const userCompId = store.userData.userId;


        // Buscar la inscripción que corresponda al usuario y al anuncio actual
        const inscripcionAEliminar = store.inscripciones.find(inscripcion =>
            inscripcion.user_id === userCompId && inscripcion.ad_id === adId
        );

        if (inscripcionAEliminar) {
            try {

                await actions.deleteinscription(inscripcionAEliminar.id);

                const updatedInscriptions = store.inscripciones.filter(inscripcion =>
                    inscripcion.id !== inscripcionAEliminar.id
                );
                localStorage.setItem('inscripciones_lista', JSON.stringify(updatedInscriptions));

                // Actualizar el estado de la tienda
                setStore({
                    ...store,
                    inscripciones: updatedInscriptions
                });

                // Opcionalmente, puedes mostrar una notificación de éxito aquí

            } catch (error) {
                console.error("Error al eliminar la inscripción:", error);
            } finally {
                // Recargar la página solo después de que la acción se haya completado
                // window.location.reload();
            }
        } else {
            console.warn('No se encontró una inscripción que corresponda a este usuario y anuncio.');
        }
    };


    //Para eliminar un anuncio   
    const handleDelete = (id) => {
        actions.deleteAd(id);
        navigate('/mis-anuncios')
    }


    //Para editar un anuncio 
    const handleEditAd = (id) => {
        console.log("Editing ad with ID:", id);
        actions.getSingleAd(id);
        navigate(`/edit-ad/${id}`);
    };


    //Para obtener la lista de pacientes
    useEffect(() => {
        actions.getPatients();
        actions.getCompanions();
    }, []);



    const patientData = store.patients.find(patient => patient.id === store.singleAd.patient_id);

    // Función para calcular la edad a partir de la fecha de nacimiento
    const getAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);///
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Obtiene todas las inscripciones y cambiar el botón de Postularse
    // 0 comprobar si esta logueado
    // 1 buscar el ad por el id
    // 2 buscas las postulaciones a ese ad.id --> devuelve lista de postulaciones
    // 3 buscar si mi user.id esta dentro de esas postulaciones. 
    //      si está: debe aparecer "CANCELAR POSTULACION" -- delete
    //      si no está: debe aparecer "postular " -- post

    useEffect(() => {

        const userCompId = store.userData.userId;
        const adId = localStorage.getItem('singleAd');
        const adIdParsed = JSON.parse(adId)
        const companions = localStorage.getItem('companions');
        const companionsParsed = JSON.parse(companions)


        // const companion = store.companions.find(companion => companion.user_id === userCompId);
        const inscripcionExistente = store.inscripciones.find(inscripcion => inscripcion.ad_id === adIdParsed?.id
            && inscripcion.user_id === userCompId);

        if (!inscripcionExistente) {
            // Después de inscribirse con éxito, ocultar el botón "POSTULARSE"
            setPostularseVisible(true);
        } else {
            setPostularseVisible(false); // Oculta "CANCELAR POSTULACIÓN"
        }


    }, [store.inscripciones, store.singleAd.id]); //store.inscripciones, 

    useEffect(() => {
        actions.getCompanions();
        actions.obtenerinscripciones();
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

    //Añade un favorito a la lista    
    const handleAddFav = async (ad_id) => {
        console.log('Data de favAd: ', store.favDataAds)
        await actions.addFavAd(ad_id);
        const updatedFavData = await actions.getAdFavs();
        const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.ad_id === store.singleAd.id);
    };



    //Elimina un favorito de la lista
    const handleDeleteFav = async (favId) => {
        console.log('Data de favAd: ', store.favDataAds)
        await actions.deleteFavAd(favId);
        const updatedFavData = await actions.getAdFavs();
        const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.ad_id === store.singleAd.id);
    };

    const isFavorited = Array.isArray(store.favDataAds) && store.favDataAds.some(fav => fav.ad_id === store.singleAd.id);

    //Calcula la nota media de las evaluaciones
    const averageRate = store.rateData.length > 0
        ? store.rateData.reduce((acc, rate) => acc + rate.rate, 0) / store.rateData.length
        : 0;


    const [contractedCompanions, setContractedCompanions] = useState(() => {
        // Inicializamos el estado con los companions ya contratados desde localStorage
        const initialContracted = [];
        store.companions.forEach(companion => {
            if (localStorage.getItem(`contracted_${companion.id}`)) {
                initialContracted.push(companion.id);
            }
        });
        return initialContracted;
    });


    // Función para manejar el contrato.
    const handleContract = async (companion_id, inscripcion_id) => {
        // Actualiza localStorage y estado
        const updatedContractedCompanions = [...contractedCompanions, companion_id];
        localStorage.setItem('contractedCompanions', JSON.stringify(updatedContractedCompanions));
        localStorage.setItem(`contracted_${companion_id}`, true);
        setContractedCompanions(updatedContractedCompanions);
        setContratoActivo(companion_id);

        try {
            // Actualiza la base de datos
            await actions.editAd(id, store.singleAd?.type, store.singleAd?.startDate, store.singleAd?.endDate,
                store.singleAd?.price, store.singleAd?.title, store.singleAd?.description, store.singleAd?.patient_id, companion_id);

            const inscripciones = store.inscripciones;
            for (const inscripcion of inscripciones) {
                if (inscripcion.id === inscripcion_id) {
                    await actions.editarInscripcion(inscripcion.id, 'OK');
                } else {
                    await actions.editarInscripcion(inscripcion.id, 'REJECTED');
                }
            }
        } catch (error) {
            console.error("Error al contratar anuncio:", error);
        }
    };


    // Función para manejar la cancelación de la contratación
    const handleCancel = async (companion_id, inscripcion_id) => {
        // Elimina el contrato del localStorage y actualiza el estado
        localStorage.removeItem(`contracted_${companion_id}`);
        const updatedContractedCompanions = contractedCompanions.filter(id => id !== companion_id);
        localStorage.setItem('contractedCompanions', JSON.stringify(updatedContractedCompanions));
        setContractedCompanions(updatedContractedCompanions);
        setContratoActivo(null);

        try {
            // Actualiza el anuncio para eliminar el compañero
            await actions.editAd(
                id,
                store.singleAd?.type,
                store.singleAd?.startDate,
                store.singleAd?.endDate,
                store.singleAd?.price,
                store.singleAd?.title,
                store.singleAd?.description,
                store.singleAd?.patient_id,
                null // Elimina el ID del compañero del anuncio
            );
            const inscripciones = store.inscripciones;
            for (const inscripcion of inscripciones) {
                if (inscripcion.id === inscripcion_id) {
                    await actions.editarInscripcion(inscripcion.id, 'REJECTED');
                } else {
                    await actions.editarInscripcion(inscripcion.id, 'PENDING');
                }
            }
        } catch (error) {
            console.error("Error al cancelar el contrato del anuncio:", error);
        }
    };

    useEffect(() => {
        // Cargar compañeros contratados desde localStorage
        const storedContractedCompanions = JSON.parse(localStorage.getItem('contractedCompanions')) || [];
        setContractedCompanions(storedContractedCompanions);

        // Cargar contrato activo desde localStorage (si aplica)
        const activeContract = storedContractedCompanions.find(id => localStorage.getItem(`contracted_${id}`));
        setContratoActivo(activeContract || null);
    }, []);

    const valorar = () => {
        window.scrollTo(0, 0)
    }

    return (

        (store.singleAd.status === "pending" || store.singleAd.status === "rejected" || store.singleAd.status === "finish") && store.singleAd.user_id === store.userData.userId ? (
            <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.block_anuncio}`}>
                {/* ICONO PARA EL ACOMPAÑANTE */}
                {store.userData.role === "companion" && (
                    isFavorited ? (
                        <span
                            onClick={() => {
                                const favId = store.favDataAds.find(fav => fav.ad_id === store.singleAd?.id);
                                if (favId) handleDeleteFav(favId);
                            }}
                            className={`position-absolute fa-solid fa-heart ${styles.fav_icon} text-danger fs-1`}
                            type="button"
                        ></span>
                    ) : (
                        <span
                            onClick={() => handleAddFav(store.singleAd.id)}
                            className={`position-absolute fs-1 fa-regular fa-heart ${styles.fav_icon}`}
                            type="button"
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
                            {patientData && patientData.photo ?
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
                            <div className="d-flex flex-column flex-wrap">
                                <p className="ps-4 ms-3">Tipo de servicio: <span className="text-secondary">{store.singleAd.type}</span></p>
                                <p className="ps-4 ms-3">Inicio: <span className="text-secondary">{new Date(store.singleAd.start_date).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</span></p>
                                <p className="ps-4 ms-3">Finalización:
                                    {store.singleAd.end_date && new Date(store.singleAd.end_date).toISOString().split('T')[0] !== "4000-01-01" ? (
                                        <span className="text-secondary ps-2">
                                            {new Date(store.singleAd.end_date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    ) : (
                                        <span className="text-secondary ps-2">sin fecha de fin</span>
                                    )}
                                </p>
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
                                <p className="ps-4 ms-3">{patientData.description}</p>
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
                                    {store.inscripciones
                                        .filter(inscripcion => inscripcion.ad_id === store.singleAd.id)
                                        .map((inscripcion, index) => {
                                            // Encuentra el companion correspondiente al companion_id de la inscripción
                                            const companion = store.companions.find(comp => comp.id === inscripcion.companion_id);

                                            // Si no se encuentra el companion, se omite el rendering de esa fila
                                            if (!companion) return null;

                                            // Asegúrate de obtener estos datos de la manera correcta
                                            const { id: companion_id, user, birthdate, experiencia, precio, valoracion } = companion;

                                            return (
                                                <tr key={inscripcion.id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{companion?.user?.name}</td>
                                                    <td>{calcularEdad(companion?.birthdate)}</td>
                                                    <td>{companion?.experience}</td>
                                                    <td>{companion?.service_cost}</td>
                                                    <td>{valoracion}</td>
                                                    <td className="text-end">
                                                        <Link to={`/perfil-profesional/${companion_id}`}>
                                                            <span className="fa-solid fa-eye pe-3 text-dark"></span>
                                                        </Link>
                                                        {/* Papelera para eliminar la postulación */}
                                                        <span className="fa-regular fa-trash-can" type="button" data-bs-toggle="modal" data-bs-target="#eliminarPostulacion"></span>
                                                        <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id="eliminarPostulacion" tabIndex="-1" aria-labelledby="eliminarPostulacionLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-body fw-bold fs-4 text-start">
                                                                        ¿Desea eliminar esta postulación?
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                                                        <button type="button" className="btn btn-danger fs-5" data-bs-dismiss="modal" onClick={() => handleCancelarClick()}>Eliminar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                    const fav = store.favDataAds.find(fav => fav.ad_id === store.singleAd?.id);
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
                                {patientData && patientData.photo ?
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
                                <div className="d-flex flex-column flex-wrap">
                                    <p className="ps-4 ms-3">Tipo de servicio: <span className="text-secondary">{store.singleAd.type}</span></p>
                                    <p className="ps-4 ms-3">Inicio: <span className="text-secondary">{new Date(store.singleAd.start_date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</span></p>
                                    <p className="ps-4 ms-3">Finalización:
                                        {store.singleAd.end_date && new Date(store.singleAd.end_date).toISOString().split('T')[0] !== "4000-01-01" ? (
                                            <span className="text-secondary ps-2">
                                                {new Date(store.singleAd.end_date).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        ) : (
                                            <span className="text-secondary ps-2">sin fecha de fin</span>
                                        )}</p>
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
                                        {store.inscripciones.length > 0 ? (
                                            store.inscripciones
                                                .filter(inscripcion => inscripcion.ad_id === store.singleAd?.id)
                                                .map((inscripcion, index) => {
                                                    const companion = store.companions.find(comp => comp.id === inscripcion.companion_id);
                                                    if (!companion) return null;

                                                    const { id: companion_id } = companion;
                                                    const isContracted = localStorage.getItem(`contracted_${companion_id}`) || contractedCompanions.includes(companion_id);
                                                    const isActiveContract = contratoActivo === companion_id;

                                                    return (
                                                        <tr key={inscripcion.id}
                                                            style={{
                                                                opacity: contratoActivo && contratoActivo !== companion_id ? 0.5 : 1,
                                                                pointerEvents: contratoActivo && contratoActivo !== companion_id ? 'none' : 'auto',
                                                            }}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{companion?.user?.name}</td>
                                                            <td>{calcularEdad(companion?.birthdate)}</td>
                                                            <td>{companion?.experience}</td>
                                                            <td>{companion?.service_cost}</td>
                                                            <td>
                                                                <span className="ps-2 fa-solid fa-star pe-1"></span>
                                                                {store.rateData.length > 0 ? `${averageRate.toFixed(2)} / 5` : "Sin valoraciones"}
                                                            </td>

                                                            <td className="text-end">
                                                                <Link to={`/perfil-profesional/${companion_id}`}>
                                                                    <span className="fa-solid fa-eye pe-3 text-dark"></span>
                                                                </Link>
                                                                {contratoActivo && contratoActivo !== companion_id ? (
                                                                    <button className="btn btn-light me-3">RECHAZADO</button>
                                                                ) : isContracted ? (
                                                                    <>
                                                                        <button className="btn btn-danger me-3" onClick={() => handleCancel(companion_id, inscripcion.id)}>CANCELAR CONTRATO</button>
                                                                        <Link to={`/rating/${companion_id}`}>
                                                                            <button onClick={valorar} className="btn btn-warning me-3">VALORAR</button>
                                                                        </Link>
                                                                    </>
                                                                ) : (
                                                                    <button className="btn btn-success me-3" onClick={() => handleContract(companion_id, inscripcion.id)}>CONTRATAR</button>
                                                                )}

                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center">Cargando datos...</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </> : ""
                    }
                </div>) : ""
    )
}



