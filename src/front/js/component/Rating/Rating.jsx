import React, { useState } from "react";
import style from "../Rating/rating.module.css";
import { Hearts } from "./Hearts.jsx";

export const Rating = () => {
    const [puntuacion, setPuntuacion] = useState(0);

    const handleClick = (index) => {
        setPuntuacion(index + 1);
    };

    return (
        <div className={style.rating}>
            <div className="row">
                {[...Array(5)].map((_, index) => (
                    <div className="col" key={index}>
                        <Hearts
                            pulsado={index < puntuacion}
                            onClick={() => handleClick(index)}
                        />
                    </div>
                ))}
            </div>
            <p>Tu puntuación: {puntuacion}</p>
        </div>
    );
};
