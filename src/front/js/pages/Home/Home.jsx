import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import { Buscador } from "../../component/Buscador/Buscador.jsx";
import { BloqueInformativo } from "../../component/BloqueInformativo/BloqueInformativo.jsx";
import { SliderHome } from "../../component/SliderHome/SliderHome.jsx";
import { CardReviews } from "../../component/CardReviews/CardReviews.jsx";
import { BloqueVerFaq } from "../../component/BloqueVerFaq/BloqueVerFaq.jsx";
import { SliderAds } from "../../component/SliderAds/SliderAds.jsx";
import { SliderCompanions } from "../../component/SliderCompanions/SliderCompanions.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Buscador />
			<BloqueInformativo />
			<SliderHome />
			<div className="bloque-informativo pb-5">
			<p className="display-4 container text-center pt-5">Reseñas verificadas de nuestros usuarios</p>
				<div className="container d-flex justify-content-between flex-wrap">	
					<CardReviews />
				</div>
			</div>
			<SliderAds/>
			<SliderCompanions/>
			<BloqueVerFaq/>
		</>
	);
};
