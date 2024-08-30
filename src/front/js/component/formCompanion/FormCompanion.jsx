import React, { useContext, useEffect, useState } from "react";
import styles from "./formCompanion.module.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { BsWindowSidebar } from "react-icons/bs";

const CompanionForm = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  console.log(`---------------------estoyaquíestoyaqui----------------------------------${store.nuevoCompanion?.id}`)
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

  const [imageUrl, setImageUrl] = useState('');
  const [photo, setPhoto] = useState('')

  useEffect(() => {

    if (store.userData) {
      setUser({
        name: store.userData?.name || "",
        lastname: store.userData?.lastname || '',
        email: store.userData?.email || "",
        phone: store.userData?.phone || '',
        location: store.userData?.location || ''
      });
    }
  }, [store.userData]);

  useEffect(() => {
    if (store.userData?.userId) {
      actions.getUserDetails(); // Fetch user details when userId is available
    }
  }, [store.userData?.userId, store.userData?.token]);



  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'photo') {
      setPhoto(files[0]); // Configura el archivo en el estado `photo`
    } else if (name in companion) {
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
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await actions.subirfoto(formData);
        if (response && response.url) {
          setCompanion(prevState => ({
            ...prevState,
            photo: response.url  // Guardar la URL de la foto en el estado de companion
          }));
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setError("Error al subir la foto.");
      }
    }
  };


  useEffect(() => {
    if (store.userData) {
      setUser({
        name: store.userData?.name || "",
        lastname: store.userData?.lastname || '',
        email: store.userData?.email || "",
        phone: store.userData?.phone || '',
        location: store.userData?.location || ''
      });
    }
  }, [store.userData]);

  useEffect(() => {
    if (store.userData) {
      actions.getUserDetails();
    }
  }, [store.userData.userId, store.userData.token]);

  useEffect(() => {
    if (store.oneCompanion?.user_id === store.userData?.userId) {
      actions.companion(store.nuevoCompanion?.id)
    }
  }, [store.userData?.userId, store.nuevoCompanion?.user_id]);

  useEffect(() => {
    setCompanion({
      description: store.oneCompanion?.description || "",
      photo: store.oneCompanion?.photo || "",
      province: store.oneCompanion?.province || '',
      birthdate: store.oneCompanion?.birthdate || '',
      availability_hours: store.oneCompanion?.availability_hours || false,
      availability_days: store.oneCompanion?.availability_days || false,
      availability_weeks: store.oneCompanion?.availability_weeks || false,
      availability_live_in: store.oneCompanion?.availability_live_in || false,
      experience: store.oneCompanion?.experience || '',
      service_cost: store.oneCompanion?.service_cost || '',
      facebook: store.oneCompanion?.facebook || '',
      instagram: store.oneCompanion?.instagram || '',
      twitter: store.oneCompanion?.twitter || '',
      linkedin: store.oneCompanion?.linkedin || '',
    });
  }, [store.oneCompanion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !companion.photo ||
      !user.name ||
      !user.lastname ||
      !user.email ||
      !user.phone ||
      !companion.birthdate ||
      !companion.province ||
      !user.location ||
      !companion.description ||
      !companion.experience
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }


    console.log(companion);



    try {
      // Primero, actualizar la información del usuario
      await actions.editUser(user.name, user.lastname, user.email, user.phone, user.location);

      // Luego, añadir o actualizar el acompañante

      await actions.updateCompanion(
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
      );



      // Mostrar un mensaje de éxito o realizar alguna otra acción
      console.log('User and companion data submitted successfully.');
    } catch (error) {
      console.error('There was an error submitting the data:', error);
    }
    if(store.nuevoCompanion?.id)
    navigate(`/perfil-profesional/${store.nuevoCompanion?.id}`);
  };

  return (
    <div className={styles.container_form_companion}>
      <form className={`m-5 container`} onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
                  onChange={handleFileChange}

                />
              </div>
            </div>
            <div className="col-12 col-sm-6 text-start">
              {companion.photo && (
                <img
                  src={companion.photo}
                  alt="Profile"
                  className={`${styles.img_perfil}`}

                />
              )}

            </div>
          </div>
          <div className="row mb-4 mt-4">
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
                readOnly
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
              <select
                className="form-control"
                name="province"
                id="province"
                value={companion.province}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una provincia</option>
                <option value="Álava">Álava</option>
                <option value="Albacete">Albacete</option>
                <option value="Alicante">Alicante</option>
                <option value="Almería">Almería</option>
                <option value="Asturias">Asturias</option>
                <option value="Ávila">Ávila</option>
                <option value="Badajoz">Badajoz</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Burgos">Burgos</option>
                <option value="Cáceres">Cáceres</option>
                <option value="Cádiz">Cádiz</option>
                <option value="Cantabria">Cantabria</option>
                <option value="Castellón">Castellón</option>
                <option value="Ciudad Real">Ciudad Real</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Cuenca">Cuenca</option>
                <option value="Girona">Girona</option>
                <option value="Granada">Granada</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="Gipuzkoa">Gipuzkoa</option>
                <option value="Huelva">Huelva</option>
                <option value="Huesca">Huesca</option>
                <option value="Illes Balears">Illes Balears</option>
                <option value="Jaén">Jaén</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Las Palmas">Las Palmas</option>
                <option value="León">León</option>
                <option value="Lleida">Lleida</option>
                <option value="Lugo">Lugo</option>
                <option value="Madrid">Madrid</option>
                <option value="Málaga">Málaga</option>
                <option value="Murcia">Murcia</option>
                <option value="Navarra">Navarra</option>
                <option value="Ourense">Ourense</option>
                <option value="Palencia">Palencia</option>
                <option value="Pontevedra">Pontevedra</option>
                <option value="Salamanca">Salamanca</option>
                <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                <option value="Segovia">Segovia</option>
                <option value="Sevilla">Sevilla</option>
                <option value="Soria">Soria</option>
                <option value="Tarragona">Tarragona</option>
                <option value="Teruel">Teruel</option>
                <option value="Toledo">Toledo</option>
                <option value="Valencia">Valencia</option>
                <option value="Valladolid">Valladolid</option>
                <option value="Bizkaia">Bizkaia</option>
                <option value="Zamora">Zamora</option>
                <option value="Zaragoza">Zaragoza</option>
                <option value="Ceuta">Ceuta</option>
                <option value="Melilla">Melilla</option>
              </select>
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
                Guardar y publicar perfil
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanionForm;
