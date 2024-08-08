import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Buscador } from "../component/Buscador/Buscador.jsx";
import { BloqueInformativo } from "../component/BloqueInformativo/BloqueInformativo.jsx";
import { SliderHome } from "../component/SliderHome/SliderHome.jsx";
import { CardReviews } from "../component/CardReviews/CardReviews.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Buscador />
			<BloqueInformativo />
			<SliderHome />
			<div className="bloque-informativo">
			<p className="fs-1 fw-bold container text-center pt-5">Reseñas verificadas de nuestros usuarios</p>
				<div className="container d-flex justify-content-between flex-wrap">	
					<CardReviews />
					<CardReviews />
					<CardReviews />
				</div>
			</div>
		</>
	);
};
