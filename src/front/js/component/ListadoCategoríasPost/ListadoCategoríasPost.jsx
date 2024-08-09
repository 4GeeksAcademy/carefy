import React from "react";
import { Link } from "react-router-dom";

export const ListadoCategoríasPost = ({ category, link }) => {
    return (
        <div className="card" style={{width: "18rem"}}>
            <ul className="list-group pt-3 list-group-flush">
                <li className="list-group-item fs-2">Categorías</li>
                <li className="list-group-item fs-5"><a href={link}>{category}</a></li>
            </ul>
        </div>
    )

}