import React, { useState } from "react";
import style from "../Rating/rating.module.css";
import { Hearts } from "./Hearts.jsx";

export const Rating = () => {
    const [puntuacion, setPuntuacion] = useState(0);
    const [indexAnterior, setIndexAnterior] = useState(null);

    /**
     * Función para validar la pulsación de los iconos.
     * Se va a validar el index y el indexAnterior. 
     * indexAnterior --> almacena la pulsación que se haya hecho anteriormente al icono
     * La primera vez que se entra en la función indexAnterior es null, con lo cual entraría en el else
     * y suma la puntuación directamente. 
     * Para las siguientes pulsaciones de los iconos, ya se validaría tanto index como indexAnterior. 
     * Si coinciden se setea el valor de index en la variable puntuación y en la variable indexAnterior.
     * En este momento el booleano "pulsado" pasaría a true. 
     * Si se vuelve a pulsar otra vez el mismo icono entraría en la validación del booleando "pulsado" y
     * en este caso en el indexAnterior se le hace -1. 
     * 
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

    return (
        <div className={style.rating}>
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
            <p>Tu puntuación: {puntuacion}</p>
        </div>
    );
};
