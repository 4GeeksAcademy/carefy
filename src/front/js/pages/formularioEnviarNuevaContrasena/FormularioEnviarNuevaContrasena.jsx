import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./formularioEnviarNuevaContrasena.module.css"

export const FormularioEnviarNuevaContrasena = () => {
    const { token } = useParams(); // Obtiene el token de la URL
    const navigate = useNavigate(); // Usamos `useNavigate` para redirigir al usuario
    const [password, setPassword] = useState(''); // Estado para la nueva contraseña
    const [error, setError] = useState(''); // Estado para manejar errores

    const handlePasswordReset = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                alert('Contraseña restablecida con éxito.');
                navigate('/'); // Redirige al usuario a la página de inicio
            } else {
                // Manejo de errores si la respuesta no es OK
                const errorData = await response.json();
                setError(errorData.message || 'Hubo un error al restablecer la contraseña.');
            }
        } catch (error) {
            // Manejo de errores en caso de fallo en la solicitud
            setError('Hubo un error en la solicitud.');
        }
    };

    return (
        <div className="row justify-content-center">
            <div className={`col-4 ${styles.formulario} rounded d-flex align-items-center justify-content-center mx-3`}>
                <div className="form p-4">
                    <div className="mb-3">
                        <h4 className="pb-4">Introduce tu nueva contraseña</h4>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar errores */}
                    <div className="">
                        <button onClick={handlePasswordReset} className={`${styles.botonInicio} fs-5 submit btn btn-primary mb-3`}>
                            Restablecer Contraseña
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
