import React from "react";
import styles from './CardReviews.module.css'

export const CardReviews = ({ username, stars, review, link }) => {
    return (
        <div className={`${styles.card_edit} card my-5 py-4`} style={{ width: "25rem" }}>
            <div className="card-body">
                <div className="d-flex align-items-baseline">
                    <p className="fs-3 card-title pe-3">{username}</p>
                    <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                    <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                    <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                    <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                    <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                </div>
                <p className="card-text fs-5 fst-italic">{review}</p>
                {/* <p className="text-secondary">25 años de experiencia</p> */}
            </div>
        </div>
    )
}