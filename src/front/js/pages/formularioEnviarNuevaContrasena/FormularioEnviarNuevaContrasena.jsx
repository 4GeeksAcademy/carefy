import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./formularioEnviarNuevaContrasena.module.css"
import { Context } from "../../store/appContext.js";

export const FormularioEnviarNuevaContrasena = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get('token');
    const [password, setPassword] = useState(''); // Estado para la nueva contraseña
    const navigate = useNavigate(); // Usamos `useNavigate` para redirigir al usuario
    const [error, setError] = useState(''); // Estado para manejar errores
    const [user, setUser] = useState()

    useEffect(() => {
		if (token) {
			//creamos funcion async para que el correcto uso del useEffect 
			const fetchData = async () => {

				//verificamos que el token sea correcto y podemos saber que usuario es el que esta accediendo con la identidad del token
				const resp = await actions.checkAuth(token);
				setUser(prev => prev = resp.user)
			}
			fetchData()
		}
		else {
			alert('Link expiró, intentelo de nuevo')
		}
	}, [token]);

    const handlePasswordReset = async () => {
        const resp = await actions.updatePassword(password, token)
		if (resp.success) {
			alert('vamos a logearnos ahora!')
			navigate('/')
       
            } else {
                // Manejo de errores si la respuesta no es OK
                const errorData = await response.json();
                setError(errorData.message || 'Hubo un error al restablecer la contraseña.');
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
