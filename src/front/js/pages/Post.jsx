import React from "react";
import { PostBlog } from "../component/PostBlog/PostBlog.jsx";
import { OtrosPost } from "../component/OtrosPost/OtrosPost.jsx";
import { Comentarios } from "../component/Comentarios/Comentarios.jsx";


export const Post = ({ title, body, img }) => {
    return (

            <div className="row container-fluid justify-content-center mt-5">
                <div className="col-12 col-sm-7 mb-5">
                    <PostBlog />
                    <p className="display-5">Comentarios</p>
                    <Comentarios />
                </div>
                <div className="col-12 col-sm-3">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item fs-2 pt-5">Otros artículos</li>
                        </ul>
                        <hr />
                        <OtrosPost />
                        <OtrosPost />
                        <OtrosPost />
                        <OtrosPost />
                    </div>
                </div>
            </div>

    )
}

