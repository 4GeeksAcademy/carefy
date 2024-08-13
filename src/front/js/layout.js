import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
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
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar/>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Blog />} path="/blog" />
                        <Route element={<Post />} path="/post-blog/:id" />
                        <Route element={<Anuncio />} path="/anuncio" />
                        <Route element={<MisAnuncios />} path="/mis-anuncios" />
                        <Route element={<MisPostulaciones />} path="/mis-postulaciones" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Faqs />} path="/faq" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<PerfilUsuario />} path="/perfilusuario" />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route element={<PublicarResena />} path="/publicar-resena" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);