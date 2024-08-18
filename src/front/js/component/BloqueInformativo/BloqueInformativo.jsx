import React from "react";
import styles from "./BloqueInformativo.module.css"
import detailed from "../../../img/detailed.jpeg"
import { Link } from "react-router-dom";

export const BloqueInformativo = () => {
    return (
        <div className={styles.bloque_informativo}>
            <div className="p-5 text-center container">
                <div className="row align-items-center py-5">
                    <div className="col-12 col-sm-6">
                        <h1 className="display-3 pb-3 text-start">Carefy te acompaña</h1>
                        <p className="col-lg-12 fs-4 text-start">
                            Somos una plataforma que tiene como objetivo unir a acompañantes con adultos mayores que necesitan de cuidado y compañía.
                        </p>
                        <div className="text-start">
                        <Link to="/registro"><button className={`btn ${styles.btn_signup} fs-5`}>Registrarse</button></Link>
                        </div>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                        <img className={`rounded ${styles.img_bloque_informativo} img-fluid`} src={detailed} />
                    </div>
                </div>
            </div>
            </div>
            )
}