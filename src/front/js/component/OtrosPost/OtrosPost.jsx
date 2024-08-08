import React from "react";


export const OtrosPost = ({ title, img }) => {
    return (

        <>
            <div className="row p-3">
                <div className="col-12 col-sm-5">
                    <img src="https://images.unsplash.com/photo-1683108339413-46e8d4a4bdeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded" alt="" />
                </div>
                <div className="col-12 col-sm-7">
                    <p className="fs-5 fw-bold">Titulo de otro artículo sobre gente mayor</p>
                    <button className="btn btn-signup">Leer más</button>
                </div>

            </div>
            <hr />
        </>

    )
}