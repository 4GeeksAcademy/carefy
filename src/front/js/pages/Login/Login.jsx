import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import style from "../Login/login.module.css"
import ancianafeliz from "../../../img/ancianafeliz.jpg";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";
import { FormularioLogin } from "../../component/FormularioLogin/FormularioLogin.jsx";

export const Login = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.userData.token && store.userData.role === "companion") {
            navigate(`/mis-postulaciones`);
        }
        else if (store.userData.token && store.userData.role === "user") {
            navigate('/mis-anuncios');
            window.location.reload();
        }
        else if (store.userData.token && store.userData.role === "admin") {
            navigate('/moderar-anuncios');
        }
        else {
            navigate('/login');
        }
    }, [store.userData.token, navigate])

    return (
        <>
            <Jumbotron bgImg={{ backgroundImage: "url('https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }} title={"Accede a la comunidad Carefy"} subtitle={"Comienza tu búsqueda de un profesional u ofrécete para dar tus servicios."} />

            <div className={`${style.paginaLogin} my-5`}>
                <div className="container">
                    <div className={`row mb-4 ${style.cuerpo} ${style.cuerpoLogin}`}>
                        <div className="col">
                            <div className={`${style.contenedorImagen1}`}>
                                <img className={`${style.imagen1} img-fluid rounded`} src={ancianafeliz}></img>
                            </div>
                        </div>

                        <div className={`col ${style.formulario} rounded d-flex align-items-center justify-content-center mx-3`}>
                            <FormularioLogin />
                        </div>

                        <div className="col d-flex justify-content-center">
                            <div>
                                <img className={`${style.imagen2} img-fluid rounded`} src="https://plus.unsplash.com/premium_photo-1681883915614-9eabecdb409c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                            </div>
                        </div>
                    </div>
                    <div className="row py-4">
                        <p className="text-center fs-3">“Envejecer no es juventud perdida, sino una nueva etapa de oportunidad y fuerza.”</p>
                        <p className="text-center fs-5 fst-italic">Betty Frieda</p>
                    </div>
                </div>
            </div>
        </>
    )
}