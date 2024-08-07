import React from "react";
import "./BloqueInformativo.css"

export const BloqueInformativo = () => {
    return (
        <div class="p-5 text-center bloque-informativo">
            <div class="container row align-items-center py-5">
                <div className="col-12 col-sm-8">
                    <h1 class="display-3 pb-3">Carefy te acompaña</h1>
                    <p class="col-lg-8 fs-4 mx-auto text-start">
                        Somos una plataforma que tiene como objetivo unir a acompañantes con adultos mayores que necesitan de cuidado y compañía.
                    </p>
                </div>
                <div className="col-12 col-sm-4">
                    <img className="rounded img-bloque-informativo" src="https://res-console.cloudinary.com/proyectocarefy/media_explorer_thumbnails/95d0a33f5cfb971b21af372fa7566e2a/detailed"/>
                </div>
            </div>
        </div>
    )
}