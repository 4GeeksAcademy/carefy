import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home/Home.jsx";
import { Blog } from "./pages/Blog/Blog.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar/Navbar.jsx"
import { Footer } from "./component/Footer/Footer.jsx"
import { Post } from "./pages/Post/Post.jsx";
import { Anuncio } from "./pages/Anuncio/Anuncio.jsx";
import { MisPostulaciones } from "./pages/MisPostulaciones/MisPostulaciones.jsx";
import { MisAnuncios } from "./pages/MisAnuncios/MisAnuncios.jsx";
import { Login } from "./pages/Login/Login.jsx"
import { Registro } from "./pages/Registro/Registro.jsx"
import { Faqs } from "./pages/Faqs/Faqs.jsx";
import {PerfilUsuario} from "./pages/PerfilUsuario/PerfilUsuario.jsx"
import {Contacto} from "../../front/js/pages/Contacto/Contacto.jsx"
import {PublicarResena} from "../js/pages/PublicarResena/PublicarResena.jsx"
import CreateAds from "./pages/CreateAds/CreateAds.jsx"
import AboutUs from "./pages/aboutUs/AboutUs.jsx"
import ListModerate from "./pages/ListModerate/ListModerate.jsx"
import RegisterAndEditCompanion from "./pages/registerAndEditCompanion/RegisterAndEditCompanion.jsx"
import ProfileCompanion from "./pages/profileCompanion/ProfileCompanion.jsx";
import ListCompanions from "./pages/listCompanios/ListCompanions.jsx";
import ListAds from "./pages/listAds/ListAds.jsx"
import { EditAd } from "./pages/EditAd/EditAd.jsx"
import { TermsAndConditions } from "./pages/TermsAndConditions/TermsAndConditions.jsx";
import { PrivacyPolitics } from "./pages/PrivacyPolitics/PrivacyPolitics.jsx";
import { Rate } from "./pages/Rate/Rate.jsx";
import { FormularioRestablecerContrasena } from "./pages/formularioRestablecerContrasena/FormularioRestablecerContasena.jsx";
import { FormularioEnviarNuevaContrasena } from "./pages/formularioEnviarNuevaContrasena/FormularioEnviarNuevaContrasena.jsx";
import ModerateCompanions from "./pages/ModerateCompanions/ModerateCompanions.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="app-container">
          <BrowserRouter basename={basename}>
            <Navbar />
            <div className="content">
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Blog />} path="/blog" />
                <Route element={<Post />} path="/post-blog/:id" />
                <Route element={<Anuncio />} path="/anuncio/:id" />
                <Route element={<MisAnuncios />} path="/mis-anuncios" />
                <Route element={<MisPostulaciones />} path="/mis-postulaciones" />
                <Route element={<Login />} path="/login" />
                <Route element={<Faqs />} path="/faq" />
                <Route element={<Registro />} path="/registro" />
                <Route element={<PerfilUsuario />} path="/perfil-usuario" />
                <Route element={<Contacto />} path="/contacto" />
                <Route element={<PublicarResena />} path="/publicar-resena" />
                <Route element={<CreateAds />} path="/crear-anuncio" />
                <Route element={<AboutUs />} path="/nosotros" />
                <Route element={<ListModerate />} path="/moderar-anuncios" />
                <Route element={<RegisterAndEditCompanion />} path="/formulario-profesional" />
                <Route element={<ProfileCompanion />} path="/perfil-profesional/:id" />
                <Route element={<ListCompanions />} path="/listado-profesionales" />
                <Route element={<ListAds />} path="/listado-anuncios" />
                <Route element={<EditAd />} path="/edit-ad/:id" />
                <Route element={<TermsAndConditions />} path="/terminos-condiciones" />
                <Route element={<PrivacyPolitics />} path="/politicas-privacidad" />
                <Route element={<Rate />} path="/rating/:id" />
                <Route element={<FormularioRestablecerContrasena />} path="/restablecer-contrasena" />
                <Route element={<FormularioEnviarNuevaContrasena />} path="/reset-password" />
                <Route element={<ModerateCompanions />} path="/moderar-profesionales" />
                <Route element={<h1>Not found!</h1>} path="*" />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      );
    };
    
    export default injectContext(Layout);