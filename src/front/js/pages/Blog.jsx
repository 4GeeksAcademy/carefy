import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { JumbotronBlog } from "../component/JumbotronBlog/JumbotronBlog.jsx";
import { CardPostBlog } from "../component/CardPostBlog/CardPostBlog.jsx";
import { ListadoCategoríasPost } from "../component/ListadoCategoríasPost/ListadoCategoríasPost.jsx";


export const Blog = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<JumbotronBlog />
			<div className="row justify-content-center my-5">
				<div className="col-12 col-sm-9 d-flex flex-column gap-5">
					<CardPostBlog />
					<CardPostBlog />
					<CardPostBlog />
				</div>
				<div className="col-12 col-sm-2">
					<ListadoCategoríasPost />
				</div>
			</div>
		</>
	);
};
