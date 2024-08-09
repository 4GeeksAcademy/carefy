import React from "react";
import styles from "./OtrosPost.module.css"


export const OtrosPost = ({ title, img }) => {
    return (

        <>
            <div className="row p-3">
                <div className="col-12 col-sm-5">
                    <img src={img} className="img-fluid rounded" alt="" />
                </div>
                <div className="col-12 col-sm-7">
                    <p className="fs-5 fw-bold">{title}</p>
                    <button className={`btn ${styles.btn_read_more}`}>Leer más</button>
                </div>

            </div>
            <hr />
        </>

    )
}