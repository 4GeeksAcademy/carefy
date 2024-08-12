import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Rating/rating.module.css"
import { FaRegHeart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";


export const Hearts = ({ pulsado, onClick }) => {

    // const heartClass = `${style.heart} ${pulsado ? style.pulsado : ''}`;
    console.log(pulsado); // Verifica el nombre de la clas

    return (
        <span className={`${style.heart}`} onClick={onClick}>
            {pulsado ? (
                <IoIosHeart className={`${style.heartgreen}`} />
            ) : (
                <FaRegHeart className={`${style.heart}`} />
            )}
        </span>
    )
}

// Pulsado en false, on click pase a true
// Pte rellenar