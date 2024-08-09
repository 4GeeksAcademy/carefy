import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Jumbotron } from "../component/Jumbotron/Jumbotron.jsx";
import { CardPostBlog } from "../component/CardPostBlog/CardPostBlog.jsx";
import { ListadoCategoríasPost } from "../component/ListadoCategoríasPost/ListadoCategoríasPost.jsx";


export const Blog = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Jumbotron bgImg={ {backgroundImage: "url('https://images.pexels.com/photos/7551606/pexels-photo-7551606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }} title={"Escribimos sobre ellos para que los conozcas"} subtitle={"En este espacio te preparamos diversos artículos con consejos, sugerencias y noticias sobre los adultos mayores."} />
			<div className="row justify-content-center my-5">
				<div className="col-12 col-sm-9 d-flex flex-column gap-5">
					<CardPostBlog />
				</div>
				<div className="col-12 col-sm-2">
					<ListadoCategoríasPost />
				</div>
			</div>
		</>
	);
};
