import React, { useContext, useEffect } from "react";
import styles from "./companionProfile.module.css";

import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import { FaRegStar } from "react-icons/fa";

import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const CompanionProfile = ({ }) => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const perfil = store.oneCompanion;


  if (!perfil) {
    return <p>Cargando...</p>;
  }

  useEffect(() => {
    
      actions.companion(id);
    
  }, [id]);
  console.log("----------------------------------------------------------", store.oneCompanion)


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

  return (
    <div
      className={`container bg-light p-4 my-5 rounded position-relative ${styles.container_profile}`}>



      <div className={`position-absolute ${styles.fav_icon}`}>
        {/* <span className="fa-solid fa-pencil pe-3"></span> */}
        <span className="fa-regular fa-heart" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></span>
      </div>


      <h1 className="mb-5 pe-5 me-3">{store.oneCompanion?.user?.name} {store.oneCompanion?.user?.lastname} </h1>
      <div className="d-flex align-items-start justify-content-between flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          <div className={`${styles.container_img} rounded`}>
            <img
              src="https://randomuser.me/api/portraits/men/12.jpg"
              className={`img-fluid ${styles.image}`}
            />
          </div>
          <div className="ms-3 fs-4 mt-3">
            <p>
              <FaRegStar className="fs-4" />
              <FaRegStar className="fs-4" />
              <FaRegStar className="fs-4" />
              <FaRegStar className="fs-4" />
              <FaRegStar className="fs-4" />
            </p>
            <p className="fs-4"><span className="fa-solid fa-id-card pe-3"></span>{calculateAge(birthdate)} años</p>
            <p className="fs-4"><span className="fa-solid fa-location-dot pe-3"></span>{store.oneCompanion?.user?.location}, {store.oneCompanion?.province}</p>
          </div>
        </div>
        <button className={`btn ${styles.btn_contact} fs-4 fw-bold`}>
          CONTACTAR
        </button>
      </div>
      <div className="pt-4">
        <p className="fs-4 fw-bold">Descripción</p>
        <p className="fs-5">
          {store.oneCompanion?.description}
        </p>
      </div>
      <div className="pt-4">
        <p className="fs-4 fw-bold">Experiencia</p>
        <p className="fs-5">
          {store.oneCompanion?.experience}
        </p>
      </div>
      <div className="pt-3 row">
        <div className="col-12 col-md-4">
          <p className="fs-4 fw-bold"><span className="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
          <div className="d-flex fs-5 gap-5 align-items-baseline">
            <div className="row">
              <div className=" col-12 col-md-12 ">
                <p className="ps-4 ms-3 ms-3 fs-5">
                  {store.oneCompanion?.availability_hours ? (
                    <IoIosCheckmarkCircleOutline className={styles.available} />
                  ) : (
                    <MdOutlineCancel className={styles.not_available} />
                  )}
                  Por horas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-4 ms-3 ms-3 fs-5">
                  {store.oneCompanion?.availability_days ? (
                    <IoIosCheckmarkCircleOutline className={styles.available} />
                  ) : (
                    <MdOutlineCancel className={styles.not_available} />
                  )}
                  Por días
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-4 ms-3 ms-3 fs-5">
                  {store.oneCompanion?.availability_weeks ? (
                    <IoIosCheckmarkCircleOutline className={styles.available} />
                  ) : (
                    <MdOutlineCancel className={styles.not_available} />
                  )}
                  Por semanas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-4 ms-3 ms-3 fs-5">
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
        {store.oneCompanion?.instagram.length === 0 && store.oneCompanion?.facebook.length === 0 && store.oneCompanion?.linkedin.length === 0 && store.oneCompanion?.twitter.length === 0 ? "" :
        <div className="col-12 col-md-4">

          <p className="fs-4 fw-bold">
            <span className="pe-2 fa-solid fa-users"></span>
            Conoce más de mí
          </p>
          {/* Instagram */}
          {store.oneCompanion?.instagram ? (
            <a target="_blank"
              className={`fs-4 ps-4 ms-3 ${styles.social_icons}`}
              href={store.oneCompanion?.instagram}
            >
              <span className="fa-brands fa-square-instagram fs-4"></span>
            </a>
          ) : (
            <div className={`${styles.hiddenButSpace}`} />
          )}

          {/* Facebook */}
          {store.oneCompanion?.facebook ? (
            <a target="_blank"
              className={`fs-4 ms-3 ${styles.social_icons}`}
              href={store.oneCompanion?.facebook}
            >
              <span className="fa-brands fa-facebook-square fs-4"></span>
            </a>
          ) : (
            <div className={`${styles.hiddenButSpace}`} />
          )}

          {/* Twitter */}
          {store.oneCompanion?.twitter ? (
            <a target="_blank"
              className={`fs-4 ms-3 ${styles.social_icons}`}
              href={store.oneCompanion?.twitter}
            >
              <span className="fa-brands fa-square-x-twitter fs-4"></span>
            </a>
          ) : (
            <div className={`${styles.hiddenButSpace}`} />
          )}

          {/* LinkedIn */}
          {store.oneCompanion?.linkedin ? (
            <a target="_blank"
              className={`fs-4 ms-3 ${styles.social_icons}`}
              href={store.oneCompanion?.linkedin}
            >
              <span className="fa-brands fa-linkedin fs-4"></span>
            </a>
          ) : (
            <div className={`${styles.hiddenButSpace}`} />
          )}
        </div>
        }
      </div>
    </div>
  );
};
