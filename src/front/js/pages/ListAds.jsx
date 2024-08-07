import React from 'react';
import "../../styles/listAds.css";
import HeaderListAds from '../component/HeaderListAds.jsx';
import Filtrado from '../component/FilterAds.jsx';
import TarjetasAnuncios from '../component/CardsAds.jsx';

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
  },
  {
    title: "Apoyo Emocional y Social para Persona Mayor",
    location: "Bilbao",
    date: "15-09-2024",
    description: "Buscamos a alguien que pueda ofrecer apoyo emocional y social a una persona mayor que se siente sola. Debe tener habilidades para escuchar y brindar conversación de calidad."
  }
];

const ListAds = () => {
  return (
    <>
      <HeaderListAds />
      <Filtrado />
      <div className="container tarjeta-contenedor">
        <div className="lista-anuncios">
          {anuncios.map((element, index) => (
            <div key={index}>
              <TarjetasAnuncios
                title={element.title}
                date={element.date}
                location={element.location}
                description={element.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListAds;
