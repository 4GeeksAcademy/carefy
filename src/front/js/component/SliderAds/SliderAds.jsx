import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import styles from "./SliderAds.module.css"
import Swiper from 'swiper';
import CardsAds from "../cardsAds/CardsAds.jsx";
import profileImg from "../../../img/profileImg.png"

export const SliderAds = () => {
    const { store, actions } = useContext(Context);
    const [filteredAds, setFilteredAds] = useState([]);
    const [filters, setFilters] = useState({ province: "",type: "", startDate: "" });

    useEffect(() => {
        actions.getAds();
        actions.getPatients();
      }, []);
    
      useEffect(() => {
        if (store.ads && store.patients) {
          const adsPatientData = store.ads
            .filter(ad => ad.status === "ok")
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
    

    useEffect(() => {
        const swiper = new Swiper('.swiper_container', {
            slidesPerView: 'auto', // Mostrará tantos slides como quepan en el contenedor
            spaceBetween: 100, // Espacio entre las tarjeta

        });
    }, []);

    return (
        <div className="container-fluid">
            <p className="text-center display-4">Postulate como cuidador</p>
            <div className={`mt-4 ${styles.bloque_card_mobile} fade-in`}>

                <div className={`${styles.swiper_container_paginas}`}>
                    <div className={`${styles.swiper_wrapper_paginas} ${styles.scrollableDiv_paginas} d-flex mb-5`}>
                        {filteredAds.length > 0 ? (
                            filteredAds.map((element, index) => (
                                <div className={`${styles.swiper_slide_paginas} ps-4 pt-3 fade-in`} key={index}>
                                    <CardsAds
                                         photo={store.userData.token && element.photo ? element.photo : profileImg}
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
                                <p>No hay resultados.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};