import React from "react";
import styles from './CardPostBlog.module.css'
import { Link } from "react-router-dom";


export const CardPostBlog = ({ img, title, description }) => {
    return (
        <div className="container-fluid">
            <div className={`${styles.cardpost_edit} bg-light p-4 row gap-2 rounded card-post`}>
                <div className="col-12 col-sm-3">
                    <img src={img} className="img-fluid rounded" alt="..." />
                </div>
                <div className="col-12 col-sm-7 card-body d-flex flex-column align-items-start">
                    <p className="card-title fs-2">{title}</p>
                    <p className={`${styles.card_text_edit} card-text`}>{description}</p>
                    <a href="post-blog" className={`${styles.btn_read_more} btn fs-5`}>Leer más</a>
                </div>
            </div>
        </div>
    )
}