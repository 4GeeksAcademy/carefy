import React from "react";
import "./BloqueVerFaq.css"
import { Link } from "react-router-dom";

export const BloqueVerFaq = () => {
    return (
        <div className="bloque-ver-faq">
            <div className="container py-5">
                <p className="fs-1 text-light">¿Quieres saber más sobre Carefy? Encuentra la respuesta a las preguntas más frecuentes <Link to="/faq"><button className="btn btn-primary fs-4 ms-3 btn-ver-faq text-dark">VER FAQ</button> </Link></p>
                
            </div>
        </div>
    )
}