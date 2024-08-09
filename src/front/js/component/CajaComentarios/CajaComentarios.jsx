import React from "react";
import styles from "./CajaComentarios.module.css"

export const CajaComentarios = () => {
    return (
        <div className={`${styles.bg_comment_box} p-4 rounded mb-5`}>
            <p className="fs-4">Escribe un comentario</p>
        <div className="input-group">
            <textarea rows="5" className="form-control" aria-label="With textarea" placeholder="Comenta e interactúa con otros usuarios..."></textarea>
        </div>
        <button className={`btn fs-5 mt-3 ${styles.btn_comment}`}>Publicar comentario</button>
        </div>
    )
}