import React from "react";
import "./BloqueInformativo.css"

export const BloqueInformativo = () => {
    return (
        <div className="bloque-informativo">
            <div class="p-5 text-center container">
                <div class="row align-items-center py-5">
                    <div className="col-12 col-sm-6">
                        <h1 class="display-3 pb-3 text-start">Carefy te acompaña</h1>
                        <p class="col-lg-12 fs-4 text-start">
                            Somos una plataforma que tiene como objetivo unir a acompañantes con adultos mayores que necesitan de cuidado y compañía.
                        </p>
                        <div className="text-start">
                        <button className="btn btn-signup fs-5" type="submit">Registrarse</button>
                        </div>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                        <img className="rounded img-bloque-informativo img-fluid" src="https://res-console.cloudinary.com/proyectocarefy/media_explorer_thumbnails/95d0a33f5cfb971b21af372fa7566e2a/detailed" />
                    </div>
                </div>
            </div>
            </div>
            )
}