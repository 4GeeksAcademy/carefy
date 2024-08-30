import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../../component/FormularioLogin/formulariologin.module.css"
import { Context } from "../../store/appContext";

export const FormularioLogin = () => {

    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const logIn = async (email, password) => {
        if (!email || !password) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        try {
            await actions.logIn(email, password);
            if (store.userData && store.userData.role) {
                if (store.userData.token && store.userData.role === "companion") {
                    navigate(`/mis-postulaciones`);
                }
                else if (store.userData.token && store.userData.role === "user") {
                    navigate('/mis-anuncios');
                }
                else if (store.userData.token && store.userData.role === "admin") {
                    navigate('/moderar-anuncios');
                }
                else {
                    navigate('/login');
                }
            } else {
                setError("Los datos ingresado no coinciden con los de un usuario existente.");
            }
        } catch (err) {
            setError("Error al iniciar sesión. Por favor, verifique sus credenciales.");
        }
    };

    return (
        <div className="form p-4">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="mb-3">
                <label htmlFor="email" className="form-label fs-5">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Introduce tu correo electrónico" onChange={(e) => setEmail(e.target.value)} value={email}></input>
            </div>



            <div className="mb-3">
                <label htmlFor="password" className="form-label fs-5">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Introduce tu contraseña" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>


            <div className="mb-3">
                <p className="text-secondary fst-italic">¿Has olvidado la contraseña?<Link to="/restablecer-contrasena"><button className="btn text-primary fw-bold">Restaurar</button></Link></p>
            </div>


            <div className="">
                <button onClick={() => logIn(email, password)} className={`${style.botonInicio} fs-5 submit btn btn-primary mb-3`} >Iniciar sesión</button>
            </div>
            <div className="">
                <p className="text-secondary fst-italic">¿No tienes una cuenta?<Link to="/registro"><button className="btn text-primary fw-bold">¡Regístrate!</button></Link></p>
            </div>
        </div>

    )
}
