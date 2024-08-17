import React from "react";
import styles from "./aboutUs.module.css"
import { Jumbotron } from "../../component/Jumbotron/Jumbotron.jsx";

const AboutUs = () => {
  return (
    <>
    			<Jumbotron bgImg={ {backgroundImage: "url('https://media.istockphoto.com/id/1512266456/es/foto/una-anciana-con-la-enfermera-paseando-por-el-jard%C3%ADn-de-una-residencia-de-ancianos-en-silla-de.jpg?s=612x612&w=0&k=20&c=_7ABNTghwi1gB1IxvlLXSW0QcZofNSg88yo4bEK1pxM=')" }} title={"Te contamos un poco más sobre Carefy"} subtitle={"Tres cosas que debes saber"} />

    <div className="my-5">
    <div className="container">
     
      <div className="row mb-4">
        <div className="col-12 col-md-4">
          <div className={`p-4 ${styles.text_who} bg-light rounded`}>
            <h4 className="text-center py-3">¿Quiénes somos?</h4>
            <p className={styles.paragraphs}>
              Somos Carefy, tu aliado en la búsqueda del cuidado perfecto para
              esos seres queridos que tanto te importan. Nos encanta pensar que
              somos como un buen amigo que siempre tiene la recomendación
              adecuada, conectándote con acompañantes que no solo cuidan, sino
              que también hacen compañía de la buena.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div>
            <img
              className={`${styles.image_lady_armchair} img-fluid rounded`}
              src="https://images.pexels.com/photos/4057763/pexels-photo-4057763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              title="senora sentada en un sillón amarillo leyendo un libro"
              alt="senora sentada en un sillón amarillo leyendo un libro"
            />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className={`p-4 ${styles.text_what} bg-light rounded`}>
            <h4 className="text-center py-3">¿Qué hacemos?</h4>
            <p className={styles.paragraphs}>
              En Carefy, hacemos que encontrar el acompañante ideal sea tan
              fácil como un clic. Te ofrecemos dos opciones: puedes buscar entre
              nuestros maravillosos profesionales, o si prefieres, publicar lo
              que necesitas y dejar que ellos vengan a ti. Además, nos
              aseguramos de que cada acompañante tenga su propia "carta de
              presentación" con valoraciones y reseñas, para que sepas que están
              más que preparados para el trabajo.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4">
          <div className={styles.row_2}>
            <img
              className={`${styles.image_girl_lady} img-fluid rounded`}
              src="https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="senora de edad avanzada con niña preparando galletas"
              title="senora de edad avanzada con niña preparando galletas"
            />
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className={`p-4 ${styles.text_why} bg-light rounded`}>
            <h4 className="text-center py-3">¿Por qué lo hacemos?</h4>
            <p className={styles.paragraphs}>
              Lo hacemos porque creemos que nuestros mayores merecen lo mejor, y
              queremos que tú te sientas tranquilo sabiendo que están en buenas
              manos. Nos mueve el deseo de facilitarte la vida, haciendo que
              este proceso sea seguro, sencillo y, por qué no, ¡hasta un poco
              divertido! Al final del día, lo que más nos importa es crear
              conexiones que importan y cuidar a quienes lo merecen con todo el
              cariño del mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default AboutUs;
