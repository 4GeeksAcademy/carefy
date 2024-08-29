import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Context } from "../../store/appContext.js";
import styles from "./formularioRestablecerContrasena.module.css"

export const FormularioRestablecerContrasena = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        actions.getUsers(); 
    }, []);

    const enviarEmail = async () => {

        console.log(email)
        const result = await actions.sendResetEmail(email);
        console.log(result)
        if (result) {
            setMessage("Se ha enviado un enlace para restablecer tu contraseña. Por favor, revisa tu correo.");
            setError(null); // Limpiar el mensaje de error si la solicitud fue exitosa
        } else {
            setError("Hubo un problema al enviar el enlace. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className={`col-4 ${styles.formulario} rounded d-flex align-items-center justify-content-center mx-3`}>
                <div className="form p-4">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    {message && <div className="alert alert-success" role="alert">{message}</div>}

                    <div className="mb-3">
                        <h4 className="pb-4">Introduce tu email y te enviaremos un enlace para que puedas recuperar tu contraseña</h4>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="ejemplo@email.com" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} />
                    </div>
                    <div className="">
                        <button onClick={enviarEmail} className={`${styles.botonInicio} fs-5 submit btn btn-primary mb-3`}>
                            Enviar enlace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};