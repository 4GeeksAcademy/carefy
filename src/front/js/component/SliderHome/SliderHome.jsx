import React from "react";
import "./SliderHome.css"

export const SliderHome = () => {
    return (
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item">
                    <svg className="bd-placeholder-img bg-slider-1" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                    <div className="container">
                        <div className="carousel-caption text-start">
                        <p className="fs-1 fw-bold">Compañía y cuidado, nuestros pilares</p>
                            <p className="fs-4">Descubre cuidadores de ancianos altamente calificados y verificados. Nuestra plataforma conecta a familias con cuidadores confiables y experimentados que se adaptan a tus necesidades específicas.</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item active">
                    <svg className="bd-placeholder-img bg-slider-2" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                    <div className="container">
                        <div className="carousel-caption text-start">
                            <p className="fs-1 fw-bold">Atención de Calidad para tus seres queridos</p>
                            <p className="fs-4">Brindamos soluciones de cuidado personalizadas y seguras. Desde asistencia diaria hasta cuidados médicos especializados, estamos aquí para facilitarte el proceso y asegurar el bienestar de tus seres queridos.</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <svg className="bd-placeholder-img bg-slider-3" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                    <div className="container ">
                        <div className="carousel-caption text-start">
                        <p className="fs-1 fw-bold">Fácil y seguro</p>
                            <p className="fs-4">Facilita la contratación y la comunicación a través de nuestra plataforma segura. Con reseñas y calificaciones de otros usuarios, toma decisiones informadas y con total tranquilidad..</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}