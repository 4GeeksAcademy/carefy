import React from 'react'
import HeaderListCompanions from '../../component/headerCompanions/HeaderListCompanions.jsx'
import CardsCompanions from '../../component/cardsCompanions/CardsCompanions.jsx'
import FilterCompanions from '../../component/filterCompanions/FilterCompanions.jsx';
import styles from './listCompanions.module.css'

const companions = [
    {
      "name": "Ana",
      "last_name": "Martínez",
      "location": "Madrid",
      "ratings": 4.7,
      "description": "Persona amable y paciente con experiencia previa en el cuidado de personas mayores. Ofrece apoyo y compañía durante el día.",
      "photo": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      "name": "Luis",
      "last_name": "Fernández",
      "location": "Barcelona",
      "ratings": 4.5,
      "description": "Asistencia nocturna para persona mayor con movilidad reducida. Horario de noche, de 10 PM a 6 AM. Experiencia en cuidado nocturno valorada.",
      "photo": "https://randomuser.me/api/portraits/men/12.jpg"
    },
    {
      "name": "María",
      "last_name": "Gómez",
      "location": "Valencia",
      "ratings": 4.8,
      "description": "Ayuda en actividades recreativas y sociales con personas mayores. Dinámica, dispuesta a participar en juegos y salidas culturales.",
      "photo": "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
      "name": "Carlos",
      "last_name": "Ruiz",
      "location": "Sevilla",
      "ratings": 4.6,
      "description": "Asistencia en el cuidado personal y en el hogar. Incluye preparar comidas, ayuda con la higiene personal y compañía durante el día.",
      "photo": "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
      "name": "Laura",
      "last_name": "Sánchez",
      "location": "Bilbao",
      "ratings": 4.9,
      "description": "Apoyo emocional y social para persona mayor que se siente sola. Habilidades para escuchar y brindar conversación de calidad.",
      "photo": "https://randomuser.me/api/portraits/women/19.jpg"
    }
  ]
  


const ListCompanions = () => {
  return (
    
    <div className={styles.container_main_profile}>
      <HeaderListCompanions/>
      <FilterCompanions />
      <div className={`container ${styles.card_container}`}>
        <div className={styles.list_companions}>
          {companions.map((element, index) => (
            <div key={index}>
              <CardsCompanions
                name={element.name} 
                last_name={element.last_name}
                ratings={element.ratings} 
                location={element.location} 
                photo={element.photo}
                description={element.description} 
              />
            </div>

          ))}
        </div>
        </div>
        </div>
    
  )
}

export default ListCompanions
