import React from "react";
import './Comentarios.css'


export const Comentarios = ({ img, username, body, date }) => {
    return (
        <div className="bg-comment-box rounded p-3">
            <div className="row">
                <div className="col-12 col-sm-2">
                    <img src="https://images.unsplash.com/photo-1594369428909-cf575675ca9a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid"/>
                </div>
                <div className="col-12 col-sm-10">
                    <div className="d-flex flex-column mb-3">
                    <span className="fs-3 text-dark fw-bold">John Doe</span>
                    <span className="text-secondary">01/05/2024</span>
                    </div>
                    <p className="text-dark">Lorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit ametLorem ipsum sit amet.</p>
                </div>
            </div>
        </div>
    )
}