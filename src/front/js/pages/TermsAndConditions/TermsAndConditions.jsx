import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../TermsAndConditions/TermsAndConditions.module.css";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";


export const TermsAndConditions = () => {

    return (
        <>
            <Jumbotron bgImg={{ backgroundImage: "url('https://images.unsplash.com/photo-1603129473525-4cd6f36fe057?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} title={"Términos y Condiciones"} subtitle={"Te contamos algunos detalles sobre nuestras condiciones de uso"} />
            <div className="my-5">
                <div className={`container bg-light rounded p-4 ${styles.tac_container}`}>
                    <h2>1. Introducción</h2>
                    <p>Bienvenido a Carefy. Estos Términos y Condiciones rigen el uso de nuestro sitio web, www.carefy.com, y los servicios que ofrecemos a través de nuestra plataforma en línea. Al acceder y utilizar nuestro sitio, usted acepta cumplir con estos términos y condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.</p>

                    <h2>2. Definiciones</h2>
                    <p>"Plataforma": Se refiere al sitio web www.carefy.com y cualquier otra herramienta digital proporcionada por Carefy.</p>
                    <p>"Usuario": Persona física o jurídica que accede a la plataforma para utilizar los servicios ofrecidos por Carefy.</p>
                    <p>"Cuidadores": Profesionales registrados en Carefy que ofrecen servicios de cuidado de ancianos.</p>
                    <p>"Servicios": Incluye, entre otros, la búsqueda, selección, y contratación de cuidadores a través de la plataforma Carefy.</p>

                    <h2>3. Uso de la Plataforma</h2>
                    <h4>3.1 Registro</h4>

                    <p>Para utilizar ciertos servicios de Carefy, es necesario registrarse en nuestra plataforma. Al registrarse, usted se compromete a proporcionar información veraz, precisa, y actualizada. Carefy se reserva el derecho de suspender o cancelar su cuenta si se detecta que la información proporcionada es falsa o engañosa.</p>

                    <h4>3.2 Responsabilidad del Usuario</h4>
                    <p>El usuario es responsable del uso adecuado de la plataforma y se compromete a no utilizarla para ningún propósito ilegal o no autorizado. Esto incluye, pero no se limita a:</p>

                    <p>No utilizar la plataforma para difundir contenido ofensivo, inapropiado o ilegal.
                        No acceder a cuentas de otros usuarios sin su autorización.
                        No interferir con el funcionamiento normal de la plataforma.</p>

                    <h2>4. Servicios</h2>
                    <h4>4.1 Descripción de los Servicios</h4>
                    <p>Carefy ofrece una plataforma donde los usuarios pueden encontrar y contratar cuidadores para el cuidado de ancianos. Carefy actúa como intermediario, facilitando la conexión entre usuarios y cuidadores, pero no es responsable directo de los servicios prestados por los cuidadores.</p>

                    <h4>4.2 Relación con los Cuidadores</h4>
                    <p>Carefy realiza una verificación básica de los cuidadores registrados, pero no garantiza la idoneidad, calidad, o legalidad de los servicios ofrecidos por ellos. Los usuarios deben realizar sus propias verificaciones y evaluaciones antes de contratar a un cuidador.</p>

                    <h2>5. Pagos</h2>
                    <h4>5.1 Tarifas</h4>
                    <p>Carefy cobra una tarifa por el uso de la plataforma, la cual puede incluir tarifas de suscripción, comisiones sobre transacciones o tarifas por servicios específicos. Todos los pagos deben realizarse a través de los métodos autorizados por Carefy y en los plazos estipulados.</p>

                    <h4>5.2 Política de Reembolsos</h4>
                    <p>Las tarifas pagadas por el uso de la plataforma no son reembolsables, salvo que se indique lo contrario en los términos específicos de cada servicio. Carefy evaluará casos de reembolsos de manera individual.</p>

                    <h2>6. Propiedad Intelectual</h2>
                    <p>Todo el contenido disponible en la plataforma, incluyendo pero no limitado a texto, gráficos, logotipos, imágenes, y software, es propiedad de Carefy o de sus licenciantes y está protegido por las leyes de propiedad intelectual. El usuario no tiene derecho a copiar, distribuir, o modificar ningún contenido de la plataforma sin autorización expresa de Carefy.</p>

                    <h2>7. Limitación de Responsabilidad</h2>
                    <p>Carefy no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la incapacidad de usar la plataforma o los servicios ofrecidos en ella. Carefy no asume responsabilidad alguna por las acciones, errores u omisiones de los cuidadores registrados en la plataforma.</p>

                    <h2>8. Modificaciones</h2>
                    <p>Carefy se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. El uso continuado de la plataforma tras la publicación de modificaciones constituye la aceptación de los nuevos términos.</p>

                    <h2>9. Ley Aplicable y Jurisdicción</h2>
                    <p>Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país donde Carefy tiene su sede. Cualquier disputa que surja en relación con estos términos será sometida a la jurisdicción exclusiva de los tribunales competentes en dicha jurisdicción.</p>

                    <h2>10. Contacto</h2>
                    <p>Si tiene alguna pregunta o inquietud sobre estos Términos y Condiciones, puede ponerse en contacto con nosotros a través de contacto@carefy.com o llamando a +34 123 465 789.</p>

                    <p>Al utilizar nuestra plataforma, usted reconoce que ha leído, entendido, y acepta estos Términos y Condiciones en su totalidad.</p>


                </div>
            </div>
        </>

    )
}