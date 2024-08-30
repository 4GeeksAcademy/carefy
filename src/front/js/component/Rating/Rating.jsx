import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../Rating/rating.module.css";
import { Hearts } from "./Hearts.jsx";
import { Context } from "../../store/appContext";

export const Rating = () => {
    const { store, actions } = useContext(Context);

    const [puntuacion, setPuntuacion] = useState(0);
    const [review, setReview] = useState('');
    const [indexAnterior, setIndexAnterior] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    /**
     * @param {index}  Posición en el array del icono que se haya pulsado
     */

    const handleClick = (index) => {
        let pulsado = false;

        if (index === indexAnterior) {
            // Si se hace clic en el mismo corazón, se reduce la puntuación
            setPuntuacion(index);
            setIndexAnterior(index); // Permite volver a seleccionar el mismo corazón y ajustar la puntuación
            pulsado = true;
        } else {
            // Si se hace clic en un corazón diferente, actualiza la puntuación
            setPuntuacion(index + 1);
            setIndexAnterior(index);
        }

        if (pulsado) {
            setPuntuacion(index);
            setIndexAnterior(index - 1);
        }
    };

    const addRate = async (companion_id, user_id, rate, review) => {
        console.log('ID companion:', store.nuevoCompanion.id);
        

        if (!review) {
            setError("Por favor, escriba una reseña.");
            return;
        }
        await actions.addRate(companion_id, user_id, rate, review);
        navigate(`/perfil-profesional/${id}`)
        window.scrollTo(0, 0);
    }


    return (
        <div className={`${style.rating_container} container bg-light rounded my-5 p-4`}>
        <div className={`${style.rating}`}>
            <div className="row">
                {[...Array(5)].map((_, index) => (
                    <div className="col" key={index}>
                        <Hearts
                            pulsado={puntuacion > index}
                            onClick={() => handleClick(index)}
                        />
                    </div>
                ))}
            </div>
            <p className="fs-4 pt-2">Tu puntuación: {puntuacion}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="mensaje" className="form-label fs-4">Escribe tu reseña</label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} type="text" cols={30} rows={5} className="form-control fs-5" id="mensaje" placeholder="Cuentános cómo valoras la experiencia con el profesional" />
            </div>
            <div className="text-center">
                <button onClick={() => addRate(id, store.userData.userId, puntuacion, review)} type="button" className={`${style.botonEnviar} btn fs-5`} >Publicar reseña</button>
            </div>
        </div>
    );
};
