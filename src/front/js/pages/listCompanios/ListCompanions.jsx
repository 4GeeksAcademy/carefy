import React, { useContext, useEffect } from 'react'
import CardsCompanions from '../../component/cardsCompanions/CardsCompanions.jsx'
import FilterCompanions from '../../component/filterCompanions/FilterCompanions.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';
import styles from './listCompanions.module.css'
import { Context } from "../../store/appContext.js";
import { useNavigate } from 'react-router-dom';



const ListCompanions = () => {
  const { store, actions } = useContext(Context);
  

  useEffect(() => {
		actions.getCompanions();
	}, [])

  return (
    <>
    <Jumbotron bgImg={ {backgroundImage: "url('https://media.istockphoto.com/id/1512266456/es/foto/una-anciana-con-la-enfermera-paseando-por-el-jard%C3%ADn-de-una-residencia-de-ancianos-en-silla-de.jpg?s=612x612&w=0&k=20&c=_7ABNTghwi1gB1IxvlLXSW0QcZofNSg88yo4bEK1pxM=')" }} title={"Conoce a nuestros expertos del cuidado"} subtitle={"Aquí podrás conocer a profesionales que están listos para brindar un cuidado atento y afectuoso."} />

    <div className={styles.container_main_profile}>
      
      <FilterCompanions />
      <div className={`container mb-5 ${styles.card_container}`}>
        <div className={styles.list_companions}>
          {store.companions.map((element, index) => (
            <div key={index}>
              <CardsCompanions
                name={element.user.name} 
                last_name={element.user.last_name}
                location={element.location} 
                photo={element.photo}
                description={element.description} 
                link={`/perfil-usuario/${element.id}`}
              />
            </div>

          ))}
        </div>
        </div>
        </div>
    </>
  )
}

export default ListCompanions
