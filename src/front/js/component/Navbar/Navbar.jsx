import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg nabvar-bg">
                <div className="container-fluid">
                    <a className="navbar-brand text-dark fs-2" href="#">Carefy</a>
                    <div className="navbar-left">
                        <div className="collapse navbar-collapse fs-4" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" aria-current="page" href="#">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" aria-current="page" href="#">FAQ</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" aria-current="page" to="/blog">Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" aria-current="page" href="#">Contacto</a>
                                </li>
                            </ul>
                            <form className="d-flex gap-2 ms-3">
                                <button className="btn btn-success fs-5 login-button" type="submit">Iniciar sesión</button>
                                <button className="btn btn-signup fs-5" type="submit">Registrarse</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="navbar  fixed-top navbar-mobile">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="/">

                    </a>
                    <div className='d-flex'>
                        <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <p className="text-dark fw-bold user-select-none">Carefy</p>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav pe-3 pb-3">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark fs-3 fw-bold" aria-current="page" to="/">Home</Link>
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
                                <button className="btn btn-success fs-5 login-button" type="submit">Iniciar sesión</button>
                                <button className="btn btn-signup fs-5" type="submit">Registrarse</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}