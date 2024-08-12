import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Rating/rating.module.css"
import { FaRegHeart } from "react-icons/fa";


export const Hearts = () => {

    // const heartClass = `${style.heart} ${pulsado ? style.pulsado : ''}`;
    // console.log(heartClass); // Verifica el nombre de la clas
    
    return (
        <span
            className={`${style.heart}`}
            // onClick={onClick}
        >
            <FaRegHeart className=style.cor />
        </span>

    )
}

// Pulsado en false, on click pase a true
// Pte rellenar