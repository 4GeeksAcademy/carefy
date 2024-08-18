import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import { BloqueAnuncio } from "../../component/BloqueAnuncio/BloqueAnuncio.jsx";


export const Anuncio = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            actions.getSingleAd(id);
        }
    }, [id]);

    return (
        <>
            <BloqueAnuncio />
        </>
    );
};

