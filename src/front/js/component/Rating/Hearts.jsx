import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Rating/rating.module.css"


export const Hearts = ({ pulsado, onClick }) => {

    const heartClass = `${style.heart} ${pulsado ? style.pulsado : ''}`;
    console.log(heartClass); // Verifica el nombre de la clas
    
    return (
        <span
            className={`${style.heart} ${pulsado ? style.pulsado : ''}`}
            onClick={onClick}
        >
            &#10084;
        </span>

    )
}