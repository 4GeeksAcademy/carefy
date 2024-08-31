import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import styles from './CardReviews.module.css';

export const CardReviews = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getReviews();
    }, []);

    const filteredReviews = Array.isArray(store.rates)
        ? store.rates.filter(rate => rate.rate === 5).slice(0, 3)
        : [];

    return (
        <div className="d-flex gap-2 flex-wrap">
            {filteredReviews.length > 0 ? (
                filteredReviews.map((rate, index) => (
                    <div key={index} className={`${styles.card_edit} card my-5 py-2`} style={{ width: "25rem" }}>
                        <div className="card-body">
                            <div className="d-flex align-items-baseline pb-3">
                                <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                                <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                                <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                                <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                                <span className={`${styles.fa_star_edit} fa-solid fa-star fs-5`}></span>
                            </div>
                            <p className="card-text fs-5 fst-italic">{rate.review}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay valoraciones disponibles.</p>
            )}
        </div>
    );
};
