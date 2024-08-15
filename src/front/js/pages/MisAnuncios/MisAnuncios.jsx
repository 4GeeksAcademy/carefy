import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";
import { Anuncios } from "../../component/Anuncios/Anuncios.jsx";


export const MisAnuncios = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/login');
        }
    }, [store.token, navigate])

	return (
		<>
			<Jumbotron bgImg={ {backgroundImage: "url('https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} title={"Revisa quién se ha apuntado a tu anuncio"} subtitle={"Lleva un control detallado de las personas apuntadas y tus favoritas."} />
			<Anuncios />
		</>
	);
};
