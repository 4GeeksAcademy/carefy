import React from 'react'
import styles from "./headerListAds.module.css"

const HeaderListAds = () => {
    return (
        <div className={`container-fluid ${styles.header_container}`}>
            <div className={`row d-flex align-items-stretch ${styles.header}`}>
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                    <h2 className={styles.text_header}>Es bueno tener compañía</h2>
                    <p className={styles.text_header}>Descubre cómo la persona adecuada puede hacer que cada día sea más alegre y especial.</p>
                </div>
            </div>
        </div>
    )
}

export default HeaderListAds
