import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import styles from "./SliderCompanions.module.css"
import Swiper from 'swiper';
import CardsCompanions from "../cardsCompanions/CardsCompanions.jsx";
import profileImg from "../../../img/profileImg.png"

export const SliderCompanions = () => {
    const { store, actions } = useContext(Context);
    const [filteredAds, setFilteredAds] = useState([]);
    const [filters, setFilters] = useState({ province: "", type: "", startDate: "" });

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
            <p className="text-center display-4">Encuentra la mejor compañía</p>
            <div className={`mt-4 ${styles.bloque_card_mobile} fade-in`}>

                <div className={`${styles.swiper_container_paginas}`}>
                    <div className={`${styles.swiper_wrapper_paginas} ${styles.scrollableDiv_paginas} d-flex mb-5`}>
                        {store.companions.map((element, index) => (
                            <div className={`${styles.swiper_slide_paginas} ps-4 pt-3 fade-in`} key={index}>
                                <CardsCompanions
                                    name={element?.user?.name || "Nombre no especificado"}
                                    last_name={element?.user?.last_name || ""}
                                    location={element?.user?.location || "Ubicación no especificada"}
                                    province={element.province || "Ubicación no especificada"}
                                    photo={element.photo ? element.photo : profileImg}
                                    description={element.description || "Descripción no especificada"}
                                    link={`/perfil-profesional/${element.id}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};