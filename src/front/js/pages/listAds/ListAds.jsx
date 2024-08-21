import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import styles from "./listAds.module.css"
import CardsAds from '../../component/cardsAds/CardsAds.jsx';
import FilterAds from '../../component/filterAds/FilterAds.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';

const ListAds = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getAds();
    actions.getPatients();
  }, [])

  if (!store.ads || !store.patients) {
    return <div>Loading...</div>; // Puedes renderizar un spinner o un mensaje de carga aquí
}


  const adsWithProvinces = store.ads && store.ads.length > 0
    ? store.ads
      .filter(ad => ad.status === "ok")
      .map(ad => {
        const patient = store.patients.find(patient => patient.id === ad.patient_id);
        return {
          ...ad,
          province: patient ? patient.province : 'Desconocida',
          photo: patient ? patient.photo : '',
          location: patient ? patient.location : ''
        };
      })
    : [];

  return (
    <>
      <Jumbotron bgImg={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681911657230-320f780ac474?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvbWJyZSUyMG1heW9yJTIwYW1pc3RhZHxlbnwwfHwwfHx8MA%3D%3D')" }} title={"Acompaña a personas mayores"} subtitle={"Navega entre nuestros anuncios y encuentra el perfil que mejor se ajusta a la asistencia que puedes brindar."} />

      <div className={`${styles.container_main_ads} mb-5`}>

        <FilterAds />
        <div className={`container ${styles.card_container}`}>
          <div className={`row ${styles.list_ads}`}>
            {adsWithProvinces.map((element, index) => (
              <div className="col-12 col-sm-3 mb-4" key={index}>
                <CardsAds
                  photo={element.photo}
                  title={element.title}
                  date={new Date(element.start_date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                  location={element.location}
                  province={element.province}
                  description={element.description}
                  link={`/anuncio/${element.id}`}
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
