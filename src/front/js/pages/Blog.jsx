import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { JumbotronBlog } from "../component/JumbotronBlog/JumbotronBlog.jsx";


export const Blog = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
            <JumbotronBlog/>
		</>
	);
};
