import React, {useContext} from "react";
import styles from "./EscribirComentario.module.css"
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

export const EscribirComentario = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className={`${styles.bg_comment_box} p-4 rounded mb-5`}>
            <p className="fs-4">Escribe un comentario</p>
        <div className="input-group">
            <textarea rows="5" className="form-control" aria-label="With textarea" placeholder="Comenta e interactúa con otros usuarios..."></textarea>
        </div>
        {store.token ?
        <button className={`btn fs-5 mt-3 ${styles.btn_comment}`}>Publicar comentario</button>
        :
        <p className="fs-5 mt-3"><Link className="text-decoration-none" to="/login">Inicia sesión</Link> para poder publicar un comentario</p>
        }
        
        </div>
    )
}