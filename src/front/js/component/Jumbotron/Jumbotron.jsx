import React from "react";
import styles from './Jumbotron.module.css'

export const Jumbotron = ({ bgImg, title, subtitle }) => {
    return (
        <div className={`p-5 bg-body-tertiary text-center ${styles.jumbotron_edit}`} style={bgImg}>
            <div className={`jumbotron-content ${styles.jumbotron_content_edit}`}>
                <div className="container">
                    <h1 className="display-5 fw-bold">{title}</h1>
                    <p className="col fs-4 text-center">{subtitle}</p>
                </div>
            </div>
        </div>
    )

}