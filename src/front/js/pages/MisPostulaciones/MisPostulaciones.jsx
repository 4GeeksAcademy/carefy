import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";
import { Postulaciones } from "../../component/Postulaciones/Postulaciones.jsx";


export const MisPostulaciones = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!store.userData.token) {
			navigate('/login');
		}
	}, [store.userData.token, navigate])

	return (
		<>
			<Jumbotron bgImg={{ backgroundImage: "url('https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} title={"Sigue detalladamente tus solicitudes"} subtitle={"Revisa el estado de cada una de tus postulaciones y favoritos."} />
			<Postulaciones />
		</>
	);
};
