import React from "react";
import styles from "./companionProfile.module.css";
import { GrEdit } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { IoIosContacts } from "react-icons/io";

export const CompanionProfile = ({
  name,
  lastName,
  age,
  location,
  description,
  availability_hours,
  availability_days,
  availability_weeks,
  availability_live_in,
  experience,
  service_cost,
  facebook,
  instagram,
  twitter,
  linkedin,
}) => {
  return (
    <div
      className={`container bg-light p-4 my-5 rounded position-relative ${styles.container_profile}`}
    >
      <div className={`position-absolute ${styles.fav_icon}`}>
        {/* <span className="fa-solid fa-pencil pe-3"></span> */}
        <span className="fa-regular fa-heart" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></span>
      </div>
      <h1 className="mb-5 pe-5 me-3">Andrés González Iniesta</h1>
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
            <p className="fs-4"><span className="fa-solid fa-id-card pe-3"></span>38 años</p>
            <p className="fs-4"><span className="fa-solid fa-location-dot pe-3"></span>Albacete</p>
          </div>
        </div>
        <button className={`btn ${styles.btn_contact} fs-4 fw-bold`}>
          CONTACTAR
        </button>
      </div>
      <div className="pt-4">
        <p className="fs-4 fw-bold">Descripción</p>
        <p className="fs-5">
          Soy un profesional en cuidado de personas mayores, comprometido con
          proporcionar un ambiente seguro y afectuoso. Mi enfoque es ofrecer
          apoyo emocional y físico personalizado, fomentando una vida digna y
          plena con empatía y respeto.
        </p>
      </div>
      <div className="pt-4">
        <p className="fs-4 fw-bold">Experiencia</p>
        <p className="fs-5">
          Con más de 8 años en el cuidado geriátrico, he manejado desde la
          administración de medicamentos hasta la coordinación de actividades
          recreativas. Mi experiencia incluye atención en residencias y a
          domicilio, adaptándome a necesidades cambiantes y trabajando en equipo
          con familiares y profesionales de salud.
        </p>
      </div>
      <div className="pt-3 row">
        <div className="col-12 col-md-4">
          <p className="fs-4 fw-bold"><span className="fa-solid fa-calendar-days pe-3"></span>Disponibilidad</p>
          <div className="d-flex fs-5 gap-5 align-items-baseline">
            <div className="row">
              <div className=" col-12 col-md-12 ">
                <p className="ps-4 ms-3 ms-3 fs-5">
                  <IoIosCheckmarkCircleOutline className={styles.available} />{" "}
                  Por horas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-4 ms-3 ms-3 fs-5">
                  <IoIosCheckmarkCircleOutline className={styles.available} />{" "}
                  Por días
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-4 ms-3 ms-3 fs-5">
                  <IoIosCheckmarkCircleOutline className={styles.available} />{" "}
                  Por semanas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-4 ms-3 ms-3 fs-5">
                  <MdOutlineCancel className={styles.not_available} />{" "}
                  Interno/a
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
        <p className="fs-4 fw-bold"><span className="fa-solid fa-coins pe-3"></span>Precio (hora)</p>
          <p className="fs-4 ps-4 ms-3">8 €</p>
        </div>
        <div className="col-12 col-md-4">

          <p className="fs-4 fw-bold">
            <span className="pe-2 fa-solid fa-users"></span>
            Conoce más de mí
          </p>
          <a
            className={`fs-4 ps-4 ms-3 ${styles.social_icons}`}
            href="https://www.instagram.com
"
          >
            <span className="fa-brands fa-square-instagram fs-4"></span>
          </a>
          <a
            className={`fs-4 ms-3 ${styles.social_icons}`}
            href="https://www.facebook.com/"
          >
            <span className="fa-brands fa-facebook-square fs-4"></span>
          </a>
          <a
            className={`fs-4 ms-3 ${styles.social_icons}`}
            href="https://x.com/"
          >
            <span className="fa-brands fa-square-x-twitter fs-4"></span>
          </a>
          <a
            className={`fs-4 ms-3 ${styles.social_icons}`}
            href="https://www.linkedin.com/"
          >
            <span className="fa-brands fa-linkedin fs-4"></span>
          </a>
        </div>
      </div>
    </div>
  );
};
