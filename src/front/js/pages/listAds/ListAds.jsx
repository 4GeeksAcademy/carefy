import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import styles from "./listAds.module.css"
import CardsAds from '../../component/cardsAds/CardsAds.jsx';
import FilterAds from '../../component/filterAds/FilterAds.jsx';
import { Jumbotron } from '../../component/Jumbotron/Jumbotron.jsx';
import profileImg from "../../../img/profileImg.png"


const ListAds = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredAds, setFilteredAds] = useState([]);
  const [filters, setFilters] = useState({ province: "",type: "", startDate: "" });


  useEffect(() => {
    actions.getAds();
    actions.getPatients();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const province = queryParams.get("province") || "";
    const type = queryParams.get("type") || "";

    setFilters({ province, type });
  }, [location.search]);

  useEffect(() => {
    if (store.ads && store.patients) {
      const adsPatientData = store.ads
      .filter(ad => ad && ad.status === "ok")
        .map(ad => {
          const patient = store.patients.find(patient => patient.id === ad.patient_id);
          return {
            ...ad,
            province: patient ? patient.province : 'Desconocida',
            photo: patient ? patient.photo : '',
            location: patient ? patient.location : ''
          };
        });

        const filtered = adsPatientData.filter(ad => {
          const matchesProvince = filters.province ? ad.province === filters.province : true;
          const matchesStartDate = filters.startDate
            ? new Date(ad.start_date).setHours(0, 0, 0, 0) >= new Date(filters.startDate).setHours(0, 0, 0, 0)
            : true;

        return matchesProvince && matchesStartDate;
      });

      setFilteredAds(filtered);
    }
  }, [store.ads, store.patients, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

    return (
      <>
        <Jumbotron 
          bgImg={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681911657230-320f780ac474?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvbWJyZSUyMG1heW9yJTIwYW1pc3RhZHxlbnwwfHwwfHx8MA%3D%3D')" }} 
          title={"Acompaña a personas mayores"} 
          subtitle={"Navega entre nuestros anuncios y encuentra el perfil que mejor se ajusta a la asistencia que puedes brindar."} 
        />
  
        <div className={`${styles.container_main_ads} mb-5`}>
          <FilterAds onFilter={handleFilterChange}/>
          <div className={`container bg-light rounded p-4 ${styles.card_container}`}>
            <div className={`row ${styles.list_ads}`}>
              {filteredAds.length > 0 ? (
                filteredAds.map((element, index) => (
                  <div className="col-12 col-sm-3 mb-4" key={index}>
                    <CardsAds
                      photo={store.userData?.token && element.photo ? element.photo : profileImg}
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
  };
  
  export default ListAds;