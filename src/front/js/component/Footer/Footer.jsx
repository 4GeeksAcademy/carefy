import React from "react";
import styles from "./Footer.module.css"

export const Footer = () => {
    return(
        <footer className="row py-5 mb-5 text-light text-center bg-dark">    
        <div className="col mb-3 text-light">
          <h5 className="mb-3">Carefy</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Home</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Nosotros</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">FAQ</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Blog</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Contacto</a></li>
          </ul>
        </div>
    
        <div className="col mb-3">
          <h5 className="mb-3">Privacidad</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Términos y Condiciones</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Políticas de privacidad</a></li>
          </ul>
        </div>
    
        <div className="col mb-3 d-flex flex-column align-items-center">
          <h5 className="mb-3">Síguenos</h5>
          <ul className={`nav ${styles.footer_icons}`}>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-3"><span className={`fa-brands fa-instagram ${styles.fa_brands_edit}`}></span></a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-3"><span className={`fa-brands fa-square-facebook ${styles.fa_brands_edit}`}></span></a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-3"><span className={`fa-brands fa-linkedin ${styles.fa_brands_edit}`}></span></a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light fs-3"><span className={`fa-brands fa-whatsapp ${styles.fa_brands_edit}`}></span></a></li>
          </ul>
        </div>
      </footer>
    )
}