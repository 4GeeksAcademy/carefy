import React from "react";
import styles from './Comentarios.module.css'


export const Comentarios = ({ img, username, body, date }) => {
    return (
        <div className={`${styles.bg_comment_box} rounded p-3`}>
            <div className="row">
                <div className="col-12 col-sm-2">
                    <img src={img} className="img-fluid rounded"/>
                </div>
                <div className="col-12 col-sm-10">
                    <div className="d-flex flex-column mb-3">
                    <span className="fs-3 text-dark fw-bold">{username}</span>
                    <span className="text-secondary">{date}</span>
                    </div>
                    <p className="text-dark">{body}</p>
                </div>
            </div>
        </div>
    )
}