import React from 'react';
import styles from "./listAds.module.css"
import CardsAds from '../../component/cardsAds/CardsAds.jsx';
import FilterAds from '../../component/filterAds/FilterAds.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';

const anuncios = [
  {
    title: "Apoyo Diurno para Adulto Mayor",
    location: "Madrid",
    date: "15-08-2024",
    description: "Buscamos una persona amable y paciente para brindar apoyo y compañía durante el día. Preferible con experiencia previa en el cuidado de personas mayores."
  },
  {
    title: "Asistencia Nocturna para Persona Mayor",
    location: "Barcelona",
    date: "20-08-2024",
    description: "Se necesita asistencia nocturna para una persona mayor con movilidad reducida. Horario de noche, de 10 PM a 6 AM. Se valorará experiencia en cuidado nocturno."
  },
  {
    title: "Apoyo en Actividades Recreativas",
    location: "Valencia",
    date: "01-09-2024",
    description: "Se busca ayuda para participar en actividades recreativas y sociales con persona mayor. Debe ser dinámico y dispuesto a participar en juegos y salidas culturales."
  },
  {
    title: "Cuidado Personal y Asistencia en el Hogar",
    location: "Sevilla",
    date: "10-09-2024",
    description: "Requerimos asistencia para el cuidado personal y ayuda en el hogar. Incluye tareas básicas como preparar comidas, ayuda con la higiene personal y compañía durante el día."
  }
];

const ListAds = () => {
  return (
    <>
    <Jumbotron bgImg={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681911657230-320f780ac474?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvbWJyZSUyMG1heW9yJTIwYW1pc3RhZHxlbnwwfHwwfHx8MA%3D%3D')" }} title={"Acompaña a personas mayores"} subtitle={"Navega entre nuestros anuncios y encuentra el perfil que mejor se ajusta a la asistencia que puedes brindar."} />
          
    <div className={`${styles.container_main_ads} mb-5`}>

      <FilterAds/>
      <div className={`container ${styles.card_container}`}>
        <div className={styles.list_ads}>
          {anuncios.map((element, index) => (
            <div key={index}>
              <CardsAds
                title={element.title}
                date={element.date}
                location={element.location}
                description={element.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ListAds;
