import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Faqs/faqs.module.css";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";


export const Faqs = () => {

    return (
        <>
            <Jumbotron bgImg={{ backgroundImage: "url('https://images.unsplash.com/photo-1603129473525-4cd6f36fe057?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} title={"Estamos aquí para ayudarte"} subtitle={"Resolvemos cualquier duda que pueda surgirte con respecto al funcionamiento de Carefy"} />
            <div className="my-5">
                <div className="container containerfaqs">

                    <div className={`accordion ${style.cajonAcordeon}`} id="accordionExample">

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className={`accordion-button collapsed fs-5 ${style.propAcordeon}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    ¿Qué es Carefy?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>Carefy es un servicio hecho por personas para personas.</strong><br></br>
                                    Nuestra plataforma permite poder encontrar un acompañante para nuestros familiares mayores.
                                    Del mismo modo, ayudamos a personas que quieren dedicar su tiempo en cuidar a este colectivo.                         </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className={`accordion-button collapsed fs-5 ${style.propAcordeon}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    ¿Cómo puedo buscar un acompañante en Carefy?
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>Dispones de un buscador en nuestra <Link to="/">página principal</Link>.</strong><br></br>
                                    En este buscador puedes filtrar por la ubicación donde te encuentres y la disponibilidad de la que necesites al acompañante                        </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className={`accordion-button collapsed fs-5 ${style.propAcordeon}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    ¿Puedo contratar un acompañante para servicios puntuales o a largo plazo?                        </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>Ambas.</strong> <br></br>
                                    Puedes buscar un acompañante para que esté con tu familiar algunas horas al día, por días o un periodo más largo de tiempo, incluso, el servicio de interno también está disponible.
                                    Siempre encontrarás a alguien dispuesto a ayudarte.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className={`accordion-button collapsed fs-5 ${style.propAcordeon}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                    ¿Es seguro contratar un acompañante a través de Carefy?                       </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>Por supuesto.</strong> <br></br>
                                    En Carefy existe una red de confianza perfecta. Sabemos que no es fácil dejar a tu familiar con una persona que desconocemos.
                                    Por eso nuestros acompañantes disponen de formación y experiencia necesaria para esta dedicada labor.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button className={`accordion-button collapsed fs-5 ${style.propAcordeon}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                                    ¿Qué nos hace diferentes?
                                </button>
                            </h2>
                            <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>Las experiencias</strong> <br></br>
                                    Las reseñas de nuestros Acompañantes están verificadas y son reales. Nadie puede dejar una reseña sin que se
                                    haya verificado la existencia de una relación entre usuario y acompañante.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button className={`accordion-button collapsed fs-5 ${style.propAcordeon}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                                    ¿Cómo es el proceso de registro?
                                </button>
                            </h2>
                            <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>Intuitivo y sencillo</strong> <br></br>
                                    A través de nuestro <Link to="/registro">formulario de registro</Link> podrás entrar a la Carefy de forma
                                    rápida y sencilla. Sólo debes tener un correo electrónico, pensar en un nombre de usuario,
                                    y una contraseña segura. Debes elegir si deseas registrarte como acompañante o como familiar de la persona
                                    que necesita este servicio.
                                    Posteriormente, en tu perfil, deberás completar unos datos básicos obligatorios.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header">
                            <button className={`accordion-button collapsed fs-5 ${style.propAcordeon}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseThree">
                                    ¿Cómo puedo recibir ayuda o notificar algún problema?
                                </button>
                            </h2>
                            <div id="collapseSeven" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>A través de nuestro formulario</strong> <br></br>
                                    Sólo tienes que hacer click en este <Link to="/contacto">enlace</Link> y rellenar los datos necesarios.
                                    ¡Estamos aquí para ayudarte!
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>

    )
}