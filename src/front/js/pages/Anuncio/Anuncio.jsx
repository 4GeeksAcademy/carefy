import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import { BloqueAnuncio } from "../../component/BloqueAnuncio/BloqueAnuncio.jsx";


export const Anuncio = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.userData.token) {
          navigate('/login');
        }
      }, [store.userData.token, navigate])


    return (
        <>
            <BloqueAnuncio />
        </>
    );
};

