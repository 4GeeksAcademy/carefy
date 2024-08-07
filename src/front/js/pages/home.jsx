import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Buscador } from "../component/Buscador/Buscador.jsx";
import { BloqueInformativo } from "../component/BloqueInformativo/BloqueInformativo.jsx";
import { SliderHome } from "../component/SliderHome/SliderHome.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Buscador />
			<BloqueInformativo />
			<SliderHome/>
		</>
	);
};
