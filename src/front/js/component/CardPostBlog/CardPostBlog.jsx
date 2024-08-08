import React from "react";
import './CardPostBlog.css'
import { Link } from "react-router-dom";


export const CardPostBlog = ({ img, title, description }) => {
    return (
        <div className="container-fluid">
            <div className="bg-light p-4 row gap-2 rounded card-post">
                <div className="col-12 col-sm-3">
                    <img src="https://plus.unsplash.com/premium_photo-1663126552655-5afc4b5a630c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded" alt="..." />
                </div>
                <div className="col-12 col-sm-7 card-body d-flex flex-column align-items-start">
                    <p className="card-title fs-2">Cuidado de la piel del adulto mayor en verano</p>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title and make up the bulk of the card's contentSome quick example text to build on the card title.</p>
                    <a href="post-blog" className="btn btn-signup fs-5">Leer más</a>
                </div>
            </div>
        </div>
    )
}