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
      <FaRegHeart className={`position-absolute ${styles.fav_icon}`} />
      {/* <div className={`position-absolute ${styles.fav_icon}`}>*/}
      {/* <GrEdit className={`position-absolute ${styles.edit_icon}`}/>*/}
      {/* <span className="fa-regular fa-trash-can"></span>
            </div> */}
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
              <FaRegStar className="" />
              <FaRegStar className="" />
              <FaRegStar className="" />
              <FaRegStar className="" />
              <FaRegStar className="" />
            </p>
            <p>
              <FaIdCard className="pe-1" />
              38
            </p>
            <p>
              <FaLocationDot className="pe-1" />
              Albacete
            </p>
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
          <p className="fs-4 fw-bold text-center">
            <FaCalendarAlt className="pe-1" />
            Disponibilidad
          </p>
          <div className="d-flex fs-5 gap-5 align-items-baseline">
            <div className="row ">
              <div className=" col-12 col-md-12 ">
                <p className="ps-5 ms-3 fs-4">
                  <IoIosCheckmarkCircleOutline className={styles.available} />{" "}
                  Por horas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-5 ms-3 fs-4">
                  <IoIosCheckmarkCircleOutline className={styles.available} />{" "}
                  Por Días
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-5 ms-3 fs-4">
                  <IoIosCheckmarkCircleOutline className={styles.available} />{" "}
                  Por Semanas
                </p>
              </div>
              <div className="col-12 col-md-12">
                <p className="ps-5 ms-3 fs-4">
                  <MdOutlineCancel className={styles.not_available} />{" "}
                  Interino/a
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 text-center">
          <p className="fs-4 fw-bold text-center">
            <FaCoins className="pe-1" />
            Precio desde (hora)
          </p>
          <p className="fs-4 ps-4 ms-3">8 €</p>
        </div>
        <div className="col-12 col-md-4 text-center">
          <p className="fs-4 fw-bold">
            <IoIosContacts className="pe-0" />
            Conoce más de mí
          </p>
          <a
            className={`fs-4 ms-3 ${styles.social_icons}`}
            href="https://www.instagram.com
"
          >
            <AiFillInstagram />
          </a>
          <a
            className={`fs-4 ms-3 ${styles.social_icons}`}
            href="https://www.facebook.com/"
          >
            <AiFillFacebook />
          </a>
          <a
            className={`fs-4 ms-3 ${styles.social_icons}`}
            href="https://x.com/"
          >
            <FaSquareXTwitter />
          </a>
          <a
            className={`fs-4 ms-3 ${styles.social_icons}`}
            href="https://www.linkedin.com/"
          >
            <AiFillLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};
