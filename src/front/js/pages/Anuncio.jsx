import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { BloqueAnuncio } from "../component/BloqueAnuncio/BloqueAnuncio.jsx";


export const Anuncio = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <BloqueAnuncio />
        </>
    );
};
