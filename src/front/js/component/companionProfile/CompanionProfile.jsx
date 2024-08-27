import React, { useContext, useEffect, useState } from "react";
import styles from "./companionProfile.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { Context } from "../../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";


export const CompanionProfile = ({ }) => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);

  const perfil = store.oneCompanion;



  if (!perfil) {
    return <p>Cargando...</p>;
  }

  useEffect(() => {

    actions.getUserDetails();
    actions.companion(id);
    actions.getCompanionFavs();
    actions.getAllFavs();
    actions.getCompanionRate(id);  // Usa 'id' para asegurarte de que se obtienen las valoraciones correctas
  }, [id]);


  // Función para calcular la edad
  const calculateAge = (birthdateString) => {
    if (!birthdateString) return 'N/A';

    const birthdate = new Date(birthdateString);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    return age;
  };

  const birthdate = store.oneCompanion?.birthdate;

  const handleEditCompanion = () => {
    console.log("Editing ad with ID:", id);

    actions.handleEditCompanionOrNewCompanion(id);
    navigate('/formulario-profesional');
  };

  const handleAddFav = async (companion_id) => {
    await actions.addCompanionFav(companion_id);
    const updatedFavData = await actions.getCompanionFavs();
    const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.companion_id === store.oneCompanion.id);
    setFavorited(isFavorited);
  };

  const handleDeleteFav = async (favId) => {
    await actions.deleteFavCompanion(favId);
    const updatedFavData = await actions.getCompanionFavs();
    const isFavorited = Array.isArray(updatedFavData) && updatedFavData.some(fav => fav.companion_id === store.oneCompanion.id);
    setFavorited(isFavorited);
  };

  const isFavorited = Array.isArray(store.favData) && store.favData.some(fav => fav.companion_id === store.oneCompanion.id);

  const averageRate = store.rateData.length > 0
    ? store.rateData.reduce((acc, rate) => acc + rate.rate, 0) / store.rateData.length
    : 0;

  return (

    <div className={`container bg-light p-4 my-5 rounded position-relative ${styles.container_profile}`}>
      {/* ICONOS PARA EL COMPANION  */}


      {store.oneCompanion?.user_id === store.userData?.userId ?
        <div className={`position-absolute ${styles.fav_icon}`}>
          <span onClick={() => handleEditCompanion()} className="fa-solid fa-pencil fs-1 pe-3"></span>
        </div>
        : ""}

      {store.userData.role === "user" && (
        <div>
          {isFavorited ? (
            <span
              onClick={() => handleDeleteFav(store.favData.find(fav => fav.companion_id === store.oneCompanion.id)?.id)}
              className={`position-absolute fa-solid fa-heart ${styles.fav_icon} text-danger fs-1`}
              type="button"
            ></span>
          ) : (
            <span
              onClick={() => handleAddFav(store.oneCompanion.id)}
              className={`position-absolute fs-1 fa-regular fa-heart ${styles.fav_icon}`}
              type="button"
            ></span>
          )}
        </div>
      )}


      <h1 className="mb-5 pe-5 me-3">{store.oneCompanion?.user?.name} {store.oneCompanion?.user?.lastname} </h1>
      <div className="d-flex align-items-start justify-content-between flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          <div className={`${styles.container_img} rounded`}>
            <img
              src={store.oneCompanion?.photo}
              className={`img-fluid ${styles.image}`}
            />
          </div>
          <div className="ms-3 fs-4 mt-3">
            <p>
              <span className="fa-solid fa-star fs-4 pe-3"></span>
              {store.rateData.length > 0
                ? (Number.isInteger(averageRate)
                  ? averageRate
                  : averageRate.toFixed(2)) + " / 5"
                : "Sin valoraciones"}
            </p>
            <p className="fs-4"><span className="fa-solid fa-id-card pe-3"></span>{calculateAge(birthdate)} años</p>
            <p className="fs-4"><span className="fa-solid fa-location-dot pe-3"></span>{store.oneCompanion?.user?.location}, {store.oneCompanion?.province}</p>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <p className="fs-4 fw-bold">Descripción</p>
        <p className="fs-5" style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {store.oneCompanion?.description}
        </p>
      </div>
      <div className="pt-4">
        <p className="fs-4 fw-bold">Experiencia</p>
        <p className="fs-5" style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {store.oneCompanion?.experience}
        </p>
      </div>
      <div className="pt-3 row">
        <div className="col-12 col-md-4">
          <p className="fs-4 fw-bold"><span className="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
          <div className="d-flex fs-5 gap-5 align-items-baseline">
            <div className="row">
              <div className=" col-12 col-md-12 ">
                <p className="ps-3 ms-3 fs-5">
                  {store.oneCompanion?.availability_hours ? (
                    <IoIosCheckmarkCircleOutline className={styles.available} />
                  ) : (
                    <MdOutlineCancel className={styles.not_available} />
                  )}
                  Por horas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-3 ms-3 fs-5">
                  {store.oneCompanion?.availability_days ? (
                    <IoIosCheckmarkCircleOutline className={styles.available} />
                  ) : (
                    <MdOutlineCancel className={styles.not_available} />
                  )}
                  Por días
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-3 ms-3 fs-5">
                  {store.oneCompanion?.availability_weeks ? (
                    <IoIosCheckmarkCircleOutline className={styles.available} />
                  ) : (
                    <MdOutlineCancel className={styles.not_available} />
                  )}
                  Por semanas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-3 ms-3 fs-5">
                  {store.oneCompanion?.availability_live_in ? (
                    <IoIosCheckmarkCircleOutline className={styles.available} />
                  ) : (
                    <MdOutlineCancel className={styles.not_available} />
                  )}
                  Interno/a
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <p className="fs-4 fw-bold"><span className="fa-solid fa-coins pe-3"></span>Pago (hora)</p>
          <p className="fs-4 ps-4 ms-3">{store.oneCompanion?.service_cost} €</p>
        </div>
        {store.oneCompanion &&
          (store.oneCompanion?.instagram ||
            store.oneCompanion?.facebook ||
            store.oneCompanion?.twitter ||
            store.oneCompanion?.linkedin) && (
            <div className="col-12 col-md-4">
              <p className="fs-4 fw-bold">
                <span className="pe-2 fa-solid fa-users"></span>
                Conoce más de mí
              </p>
              {/* Instagram */}
              <div className="d-flex ps-4 ms-3 gap-3">
              {store.oneCompanion.instagram ? (
                <a target="_blank"
                  className={`fs-4 ${styles.social_icons}`}
                  href={store.oneCompanion?.instagram}
                >
                  <span className="fa-brands fa-square-instagram fs-4"></span>
                </a>
              ) : (
                <div className={`fs-4 ${styles.hiddenButSpace}`} />
              )}

              {/* Facebook */}
              {store.oneCompanion.facebook ? (
                <a target="_blank"
                  className={`fs-4 ${styles.social_icons}`}
                  href={store.oneCompanion?.facebook}
                >
                  <span className="fa-brands fa-facebook-square fs-4"></span>
                </a>
              ) : (
                <div className={`fs-4 ${styles.hiddenButSpace}`} />
              )}

              {/* Twitter */}
              {store.oneCompanion.twitter ? (
                <a target="_blank"
                  className={`fs-4 ${styles.social_icons}`}
                  href={store.oneCompanion?.twitter}
                >
                  <span className="fa-brands fa-square-x-twitter fs-4"></span>
                </a>
              ) : (
                <div className={`fs-4 ${styles.hiddenButSpace}`} />
              )}

              {/* LinkedIn */}
              {store.oneCompanion.linkedin ? (
                <a target="_blank"
                  className={`fs-4 ${styles.social_icons}`}
                  href={store.oneCompanion?.linkedin}
                >
                  <span className="fa-brands fa-linkedin fs-4"></span>
                </a>
              ) : (
                <div className={`fs-4 ${styles.hiddenButSpace}`} />
              )}
            </div>
            </div>
          )}
        <div className="accordion mt-4" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button fs-5 border border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Valoraciones y reseñas
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                {Array.isArray(store.rateData) && store.rateData.map((data, index) => (
                  <div>
                    <p key={index}><span className="fa-solid fa-star pe-2"></span>{data.rate} / 5</p>
                    <p>{data.review}</p>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};