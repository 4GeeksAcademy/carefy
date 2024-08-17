import React from "react";
import CompanionForm from "../../component/formCompanion/FormCompanion.jsx";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";
import styles from "./registerAndEditCompanion.module.css";

const RegisterAndEditCompanion = () => {
    return (
        <>
            <Jumbotron bgImg={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2024/07/08/16/28/ai-generated-8881543_640.jpg')" }} title={"Completa tu perfil así te encuentran"} subtitle={"En tan solo unos minutos tendrás listo tu perfil para empezar a trabajar"} />

            <CompanionForm />
        </>
    )

}

export default RegisterAndEditCompanion
