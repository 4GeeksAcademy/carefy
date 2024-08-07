import React from "react";
import "./Footer.css"

export const Footer = () => {
    return(
        <footer class="row py-5 my-5 border-top text-light text-center bg-dark">    
        <div class="col mb-3 text-light">
          <h5 className="mb-3">Carefy</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Home</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Nosotros</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">FAQ</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Blog</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Contacto</a></li>
          </ul>
        </div>
    
        <div class="col mb-3">
          <h5 className="mb-3">Privacidad</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Términos y Condiciones</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light">Políticas de privacidad</a></li>
          </ul>
        </div>
    
        <div class="col mb-3 d-flex flex-column align-items-center">
          <h5 className="mb-3">Síguenos</h5>
          <ul class="nav gap-3">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light fs-3"><span class="fa-brands fa-instagram"></span></a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light fs-3"><span class="fa-brands fa-square-facebook"></span></a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light fs-3"><span class="fa-brands fa-linkedin"></span></a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-light fs-3"><span class="fa-brands fa-whatsapp"></span></a></li>
          </ul>
        </div>
      </footer>
    )
}