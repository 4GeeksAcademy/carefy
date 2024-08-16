import React from "react";
import CompanionForm from "../../component/formCompanion/FormCompanion.jsx";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";
import styles from "./registerAndEditCompanion.module.css";

const RegisterAndEditCompanion = () => {
    return (
        <>
            <Jumbotron bgImg={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2024/07/08/16/28/ai-generated-8881543_640.jpg')" }} title={"Forma parte de nuestra comunidad,"} subtitle={"¡solo necesitas unos minutos para registrarte!"} />

            <CompanionForm />
        </>
    )

}

export default RegisterAndEditCompanion
