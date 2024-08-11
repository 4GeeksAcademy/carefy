import React from "react";
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import logo from '../../../img/logo.png'

export const Navbar = ({username}) => {
    return (
        <>
            <nav className={`navbar navbar-expand-lg ${styles.nabvar_bg}`}>
                <div className={`container-fluid ${styles.nav_desktop}`}>
                    <Link className="navbar-brand text-dark fs-1" to="/"><img className={`img-fluid ${styles.logo}`} src={logo} />Carefy</Link>
                    <div className={styles.navbar_left}>
                        <div className="collapse navbar-collapse fs-4" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`text-dark nav-link ${styles.nav_link_edit}`} aria-current="page" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <a className={`text-dark nav-link ${styles.nav_link_edit}`} aria-current="page" href="#">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`text-dark nav-link ${styles.nav_link_edit}`} aria-current="page" href="#">FAQ</a>
                                </li>
                                <li className="nav-item">
                                    <Link className={`text-dark nav-link ${styles.nav_link_edit}`} aria-current="page" to="/blog">Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <a className={`text-dark nav-link ${styles.nav_link_edit}`} aria-current="page" href="#">Contacto</a>
                                </li>
                            </ul>
                            <form className="d-flex gap-2 ms-3">
                                {/* <button className={`btn btn-success fs-5 ${styles.login_button}`} type="submit">Iniciar sesión</button>
                                <button className={`btn fs-5 ${styles.btn_signup}`} type="submit">Registrarse</button> */}
                           
                                <div className="btn-group">
                                    <button type="button" className={`btn text-light ${styles.login_button} dropdown-toggle fs-5`} data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="fa-solid fa-user pe-2"></span>{username}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><a className={`dropdown-item ${styles.dropdown_item_edit}`} href="#">Mi perfil</a></li>
                                        <li><Link className={`dropdown-item ${styles.dropdown_item_edit}`} to="/mis-postulaciones">Mis postulaciones</Link></li>
                                        <li><Link className={`dropdown-item ${styles.dropdown_item_edit}`} to="/mis-anuncios">Mis anuncios</Link></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><button className="btn dropdown-item text-danger fw-bold" href="#"><span class="fa-solid fa-power-off pe-2"></span>Cerrar sesión</button></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className={`navbar ${styles.navbar_edit} ${styles.navbar_mobile}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand text-dark fs-1" to="/"><img className={`img-fluid ${styles.logo}`} src={logo} />Carefy</Link>
                    <button className={`navbar-toggler custom-toggler ${styles.navbar_toggler_edit} ${styles.custom_toggler_edit}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className={`${styles.navbar_toggler_icon} navbar-toggler-icon`}></span>
                    </button>
                    <div className={`offcanvas offcanvas-end ${styles.offcanvas_edit}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <Link className="navbar-brand text-dark fs-1" to="/"><img className={`img-fluid ${styles.logo}`} src={logo} />Carefy</Link>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav pe-3 pb-3">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark fs-3 fw-bold" aria-current="page" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark fs-3 fw-bold" aria-current="page" href="#">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark fs-3 fw-bold" aria-current="page" href="#">FAQ</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark fs-3 fw-bold" aria-current="page" to="/blog">Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark fs-3 fw-bold" aria-current="page" href="#">Contacto</a>
                                </li>
                            </ul>

                            <form className="d-flex flex-column gap-2 align-items-start">
                                <button className={`btn btn-success fs-5 ${styles.login_button}`} type="submit">Iniciar sesión</button>
                                <button className={`btn fs-5 ${styles.btn_signup}`} type="submit">Registrarse</button>
                            </form>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}