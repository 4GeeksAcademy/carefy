import React from "react";
import "./Navbar.css"

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg nabvar-bg">
            <div className="container-fluid">
                <a className="navbar-brand text-dark fs-2" href="#">Carefy</a>
                <div className="navbar-left">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse fs-4" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-dark" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" aria-current="page" href="#">Nosotros</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" aria-current="page" href="#">FAQ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" aria-current="page" href="#">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" aria-current="page" href="#">Contacto</a>
                            </li>
                        </ul>
                        <form className="d-flex gap-2 ms-3" role="search">
                            <button className="btn btn-success fs-5 login-button" type="submit">LogIn</button>
                            <button className="btn btn-warning fs-5" type="submit">SignUp</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}