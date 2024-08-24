import React from "react";
import styles from "./BloqueVerFaq.module.css"
import { Link } from "react-router-dom";

export const BloqueVerFaq = () => {
    return (
        <div className={styles.bloque_ver_faq}>
            <div className="container py-5">
                <p className="fs-1 text-light text-center">¿Quieres saber más sobre Carefy?<Link to="/faq"><button className={`btn btn-primary fs-4 ms-3 ${styles.btn_ver_faq} text-dark`}>VER FAQ</button> </Link></p>
                
            </div>
        </div>
    )
}