import React from 'react'


const HeaderListAds = () => {
    return (
        <div className="container-fluid encabezado-contenedor">
            <div className="row d-flex align-items-stretch encabezado">
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                    <h2>Es bueno tener compañía</h2>
                    <p>Descubre cómo la persona adecuada puede hacer que cada día sea más alegre y especial.</p>
                </div>
                <div className="col-lg-6 img-container">
                    <img
                        className="img-fluid imagen-encabezado"
                        alt="Un adulto y una persona mayor caminando y charlando en medio de la tranquilidad de la naturaleza"
                        title="Un adulto y una persona mayor caminando y charlando en medio de la tranquilidad de la naturaleza"
                        src="https://plus.unsplash.com/premium_photo-1681911657230-320f780ac474?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvbWJyZSUyMG1heW9yJTIwYW1pc3RhZHxlbnwwfHwwfHx8MA%3D%3D"
                    />
                </div>
            </div>
        </div>
    )
}

export default HeaderListAds
