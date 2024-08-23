import React, { useContext, useEffect, useState } from 'react'
import CardsCompanions from '../../component/cardsCompanions/CardsCompanions.jsx'
import FilterCompanions from '../../component/filterCompanions/FilterCompanions.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';
import styles from './listCompanions.module.css'
import { Context } from "../../store/appContext.js";
import profileImg from "../../../img/profileImg.png"



const ListCompanions = () => {
  const { store, actions } = useContext(Context);
  const [filtroPerfiles, setFiltroPerfiles] = useState([]);
  const [filtros, setFiltros] = useState({province:"", availability: ""})

  
  useEffect(() => {
    actions.getCompanions();
  }, [])

  useEffect(() => {
    // Verificar si 'store.companions' existe antes de proceder
    if (store.companions) {
      // Función para cadenas de texto eliminando acentos y caracteres
      const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
      // Obtiene la lista de compañeros desde el estado global
      const companionsData = store.companions;
  
      // Mapea los valores de disponibilidad a los campos en el objeto perfil
      const availabilityMap = {
        "Horas": "availability_hours",   // Si el filtro es "Horas", se mapea a "availability_hours"
        "Dias": "availability_days",     // Si el filtro es "Dias", se mapea a "availability_days"
        "Semanas": "availability_weeks", // Si el filtro es "Semanas", se mapea a "availability_weeks"
        "Interno": "availability_live_in"// Si el filtro es "Interno", se mapea a "availability_live_in"
      };
  
      // Filtra la lista de compañeros según los filtros aplicados
      const filterCompanions = companionsData.filter(perfil => {
        // Filtra por provincia: compara la provincia del perfil con el filtro, ignorando acentos y mayúsculas/minúsculas
        const filterProvincias = filtros.province ? 
          normalizeString(perfil.province).toLowerCase() === normalizeString(filtros.province).toLowerCase() : 
          true; // Si no hay filtro de provincia, no filtra por provincia
  
        // Filtra por disponibilidad: verifica si el perfil tiene la disponibilidad deseada
        const filterDisponibilidad = filtros.availability ? (
          perfil[availabilityMap[filtros.availability]] === true
        ) : true; // Si no hay filtro de disponibilidad, no filtra por disponibilidad
  
        // Devuelve true si el perfil cumple con ambos filtros, false en caso contrario
        return filterProvincias && filterDisponibilidad;
      });
  
      // Actualiza el estado con la lista filtrada de compañeros
      setFiltroPerfiles(filterCompanions);
    }
  }, [store.companions, filtros]); // El useEffect se ejecuta cuando cambian 'store.companions' o 'filtros'
  
  

  const handleFilterChange=(newFilters)=>{
    setFiltros(newFilters)

  }

  return (
    <>
      <Jumbotron bgImg={{ backgroundImage: "url('https://media.istockphoto.com/id/1512266456/es/foto/una-anciana-con-la-enfermera-paseando-por-el-jard%C3%ADn-de-una-residencia-de-ancianos-en-silla-de.jpg?s=612x612&w=0&k=20&c=_7ABNTghwi1gB1IxvlLXSW0QcZofNSg88yo4bEK1pxM=')" }} title={"Conoce a nuestros expertos del cuidado"} subtitle={"Aquí podrás conocer a profesionales que están listos para brindar un cuidado atento y afectuoso."} />

    <div className={styles.container_main_profile}>
      
      <FilterCompanions onFilter={handleFilterChange} />
      <div className={`container p-4 bg-light rounded mb-5 ${styles.card_container}`}>
        <div className={`row ${styles.list_companions}`}>
          {filtroPerfiles.length > 0 ? (
          filtroPerfiles.map((element, index) => (
            <div className='col-12 col-sm-3' key={index}>
              <CardsCompanions
                    name={element?.user?.name || "Nombre no especificado"}
                  last_name={element?.user?.last_name || ""}
                  location={element?.user?.location || "Ubicación no especificada"}
                  province={element.province || "Ubicación no especificada"}
                  photo={store.userData.token && element.photo ? element.photo : profileImg}
                  description={element.description || "Descripción no especificada"}
                  link={`/perfil-profesional/${element.id}`}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No hay resultados respecto a tu búsqueda.</p>
          </div>
        )}
          
        </div>
        </div>
        
      </div>
    </>
  );
}

export default ListCompanions
