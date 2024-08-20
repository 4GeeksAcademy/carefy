import React, { useContext, useEffect, useState } from "react";
import styles from "./formCompanion.module.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CompanionForm = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  const [companion, setCompanion] = useState({
    description: "",
    photo: "",
    province: "",
    birthdate: "",
    availability_hours: false,
    availability_days: false,
    availability_weeks: false,
    availability_live_in: false,
    experience: "",
    service_cost: "",
    facebook: "", 
    instagram: "",
    twitter: "",
    linkedin: "",
    
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    lastname: "",
    phone: "",
    location: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (name in companion) {
      setCompanion(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else if (name in user) {
      setUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    console.log(companion);

    
  };

  useEffect(() => {
    if (store.userData) {
      setUser({
        name: store.userData.name || "",
        lastname: store.userData.lastname || '',
        email: store.userData.email || "",
        phone: store.userData.phone || '',
        location: store.userData.location || ''
      });
    }
  }, [store.userData]);

  useEffect(() => {
      setCompanion({
        description: companion.description || "",
        photo: companion.photo || "",
        province: companion.province || '',
        birthdate: companion.birthdate || '',
        availability_hours: companion.availability_hours || false,
        availability_days: companion.availability_days || false,
        availability_weeks: companion.availability_weeks || false,
        availability_live_in: companion.availability_live_in || false,
        experience: companion.experience || '', 
        service_cost: companion.service_cost || '',
        facebook: companion.facebook || '',
        instagram: companion.instagram || '',
        twitter: companion.twitter || '',
        linkedin: companion.linkedin || '',
        
        
      });
    
  }, [store.companions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(companion);
    
    try {
      // Primero, actualizar la información del usuario
      await actions.editUser(user.name, user.lastname, user.email, user.phone, user.location);

      // Luego, añadir el acompañante
      await actions.anadir_companion(
        companion.description,
        companion.photo,
        companion.province,
        companion.birthdate,
        companion.availability_hours,
        companion.availability_days,
        companion.availability_weeks,
        companion.availability_live_in,
        companion.experience,
        companion.service_cost,
        companion.facebook,
        companion.instagram,
        companion.twitter,
        companion.linkedin,
        store.userData.userId,  // Utilizar el ID del usuario actual
      );

      // Mostrar un mensaje de éxito o realizar alguna otra acción
      console.log('User and companion data submitted successfully.');
    } catch (error) {
      console.error('There was an error submitting the data:', error);
    }

   // navigate('/perfil-profesional');
  };

  return (
    <div className={styles.container_form_companion}>
      <form className={`m-5 container`} onSubmit={handleSubmit}>
        <div className={`container-fluid p-4 ${styles.form_companion}`}>
          {/* Fila 1: foto y campos básicos */}
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="input-group mb-4">
                <label className="fs-5 mt-1 pe-3" htmlFor="inputGroupFile01">Foto de perfil</label>
                <input
                  type="file"
                  className="form-control rounded"
                  id="inputGroupFile01"
                  name="photo"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-4">
              <label htmlFor="name" className="form-label fs-5">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={handleChange}
                value={user.name}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="lastname" className="form-label fs-5">Apellidos</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                id="lastname"
                onChange={handleChange}
                value={user.lastname}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label fs-5">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={handleChange}
                value={user.email}
                required
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-3">
              <label htmlFor="phone" className="form-label fs-5">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={user.phone}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="birthdate" className="form-label fs-5">Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                name="birthdate"
                id="dob"
                value={companion.birthdate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="province" className="form-label fs-5">Provincia</label>
              <input
                type="text"
                className="form-control"
                name="province"
                id="province"
                value={companion.province}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="location" className="form-label fs-5">Localidad</label>
              <input
                type="text"
                className="form-control"
                name="location"
                id="location"
                value={user.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fila 3: Descripción */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="description" className="form-label fs-5">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={companion.description}
                onChange={handleChange}
                required
                placeholder="Háblanos un poco de ti, de tus intereses y qué te motiva a trabajar en el cuidado de personas mayores."
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Fila 4: Experiencia */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="experience" className="form-label fs-5">Experiencia</label>
              <textarea
                className="form-control"
                id="experience"
                name="experience"
                value={companion.experience}
                onChange={handleChange}
                required
                placeholder="Cuéntanos sobre tu experiencia previa."
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Fila 5: Disponibilidad y precio */}
          <div className="row mb-4">
            <div className="col-6">
              <label className="form-label fs-5">Disponibilidad</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="availability_hours"
                  type="checkbox"
                  id="hours"
                  checked={companion.availability_hours}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="hours">Horas</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="availability_days"
                  type="checkbox"
                  id="days"
                  checked={companion.availability_days}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="days">Días</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="availability_weeks"
                  type="checkbox"
                  id="weeks"
                  checked={companion.availability_weeks}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="weeks">Semanas</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="availability_live_in"
                  type="checkbox"
                  id="interno"
                  checked={companion.availability_live_in}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="interno">Interno/a</label>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="service_cost" className="form-label fs-5">Precio (hora)</label>
              <input
                type="number"
                className="form-control"
                name="service_cost"
                id="service_cost"
                value={companion.service_cost}
                onChange={handleChange}
                required
                placeholder="€"
              />
            </div>
          </div>

          {/* Fila 6: Redes Sociales */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="instagram" className="form-label fs-5">Instagram</label>
              <input
                type="url"
                className="form-control"
                name="instagram"
                id="instagram"
                value={companion.instagram}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="linkedin" className="form-label fs-5">LinkedIn</label>
              <input
                type="url"
                className="form-control"
                name="linkedin"
                id="linkedin"
                value={companion.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="facebook" className="form-label fs-5">Facebook</label>
              <input
                type="url"
                className="form-control"
                name="facebook"
                id="facebook"
                value={companion.facebook}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="twitter" className="form-label fs-5">Twitter</label>
              <input
                type="url"
                className="form-control"
                name="twitter"
                id="twitter"
                value={companion.twitter}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Fila 7: botones */}
          <div className="row mb-4">
            <div className="col-12 text-end">
              <button
                type="submit"
                className={`btn btn-primary fs-5 me-2 ${styles.btn_submit}`}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanionForm;
