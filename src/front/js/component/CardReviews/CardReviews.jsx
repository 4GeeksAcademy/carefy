import React from "react";
import './CardReviews.css'

export const CardReviews = ({ name, stars, review, link }) => {
    return (
        <div class="card my-5 py-4" style={{ width: "25rem" }}>
            <div class="card-body">
                <div className="d-flex align-items-baseline">
                    <p class="fs-3 card-title pe-3">Elizabeth Svenson</p>
                    <span class="fa-solid fa-star fs-5"></span>
                    <span class="fa-solid fa-star fs-5"></span>
                    <span class="fa-solid fa-star fs-5"></span>
                    <span class="fa-solid fa-star fs-5"></span>
                    <span class="fa-solid fa-star fs-5"></span>
                </div>
                <p class="card-text fs-5 fst-italic">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="text-secondary">25 años de experiencia</p>
            </div>
        </div>
    )
}