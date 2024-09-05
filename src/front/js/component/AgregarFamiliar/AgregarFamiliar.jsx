import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "../AgregarFamiliar/agregarfamiliar.module.css"
import { Context } from "../../store/appContext";


export const AgregarFamiliar = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [edad, setEdad] = useState(0);
    const [name, setName] = useState('');
    const [alias, setAlias] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState(0);
    const [description, setDescription] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [dependency, setDependency] = useState('');
    const [province, setProvince] = useState('');
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState('')
    const [error, setError] = useState('')
    const [familiares, setFamiliares] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    // Cargar la lista de familiares cuando el componente se monta
    useEffect(() => {
        setFamiliares(store.familiares);
    }, [store.familiares]);

    // Función para calcular la edad a partir de la fecha de nacimiento
    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date()
        const fechaNac = new Date(fechaNacimiento);
        let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth()

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edadCalculada--;
        }
        return edadCalculada
    }

    /**
     * Función subirfoto: agrega una imagen
     * Con formData da un formato específico al tipo de fichero (foto) que se le pasa.
     * formData.append("file", photo); --> añade al formData el fichero al que se le quiere dar formato. 
     * response: llama a la función del actions que conecta con Clodinary, devolviendo el objeto que contiene
     * en el atributo "url" la url en string que necesitamos para que se pinte la imagen. 
     * setPhoto guarda la url en la variable photo. 
     * @param {photo}  
     * @returns null si hay algún error.
     */
    const subirfoto = async (photo) => {
        try {
            const formData = new FormData();
            formData.append("file", photo);
            const response = await actions.subirfoto(formData);
            setPhoto(response.url)
            console.log('response', response);

        } catch (error) {
            console.error("Error al subir la imagen:", error);
            return null;
        }
    };


    const anadir_familiar = async (event, name, alias, lastname, phone, description, birthdate, dependency, province, location, photo) => {
        event.preventDefault();
        const user_id = store.userData.userId;

        // Validación de campos obligatorios
        if (!name || !alias || !lastname || !phone || !description || !birthdate || !dependency || !province || !location) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        try {
            // Ejecutar la función para añadir el familiar
            const result = await actions.anadir_familiar(name, alias, lastname, phone, description, birthdate, dependency, province, location, photo, user_id);
            
            const modalElement = document.querySelector('[data-bs-dismiss="modal"]');
            if (modalElement) {
                modalElement.click();  // Simula el clic en el botón de cierre de la modal
            }

            // Resetear el formulario
            resetForm();
           
        } catch (error) {
            console.error("Error durante la petición:", error);
            setError("Ocurrió un error al guardar los datos.");
        }
    };

    const resetForm = () => {
        setName('');
        setAlias('');
        setLastname('');
        setPhone('');
        setDescription('');
        setBirthdate('');
        setDependency('');
        setProvince('');
        setLocation('');
        setPhoto('');
        setEdad(0);
        setError('');
    };



    // Este useEffect se ejecutará cada vez que imageUrl cambie
    useEffect(() => {
        if (imageUrl) {
            console.log('imageUrl actualizado:', imageUrl);
        }
    }, [imageUrl]); // Se ejecuta cuando imageUrl cambia






    /**
     *Recoge la fecha que le hemos pasado a través del calendario.
     *Lo pasa a la variable fechaNacimiento. 
     *Guardamos esa fecha con el setNacimiento
     *Guardamos el valor edad llamando a la función de arriba
     * @param {e} Recibe el evento del input de la fecha
     */
    const handleBirthdayChange = (e) => {
        const fechaNacimiento = e.target.value;
        // setNacimiento(fechaNacimiento);
        setBirthdate(fechaNacimiento)
        setEdad(calcularEdad(fechaNacimiento));
    };

    return (

        <form className="form p-2" onSubmit={(event) => anadir_familiar(event, name, alias, lastname, phone, description, birthdate, dependency, province, location, photo)}>
            <p>Todos los campos marcados con <strong> * </strong>son obligatorios</p>
            <div className="mb-3">
                <label htmlFor="alias" className="form-label fs-5">Alias *</label>
                <input type="text" className="form-control" id="alias" placeholder="Ejemplo: Mi padre" onChange={(e) => setAlias(e.target.value)} value={alias} />

            </div>

            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-5">Nombre * </label>
                <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} />
            </div>

            <div className="mb-3">
                <label htmlFor="lastname" className="form-label fs-5">Apellidos *</label>
                <input type="text" className="form-control" id="lastname" onChange={(e) => setLastname(e.target.value)} value={lastname} />
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label fs-5">Teléfono de contacto *</label>
                <input type="tel" className="form-control" id="phone" placeholder="+34 123 465 789" onChange={(e) => setPhone(e.target.value)} value={phone} />
            </div>

            <div className="mb-3">
                <div className="row">
                    <div className="col-8">
                        <label htmlFor="birthdate" className="fs-5">Fecha de nacimiento * </label><br></br>
                        <input onChange={handleBirthdayChange} type="date" id="birthdate" name="nacimiento" value={birthdate} />
                    </div>
                    <div className="col">
                        <label htmlFor="birthdate" className="fs-5">Edad: {edad} años</label><br></br>
                    </div>
                </div>
            </div>

            {/* Selección de grado de dependencia */}
            <div className="mb-3">
                <label htmlFor="dependencia" className="form-label fs-5">Grado de dependencia * </label>
                <div className="accordion" id="dependencia">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#dependOne" aria-expanded="true" aria-controls="dependOne">
                                Selecciona el grado de dependencia
                            </button>
                        </h2>
                        <div id="dependOne" className="accordion-collapse collapse" data-bs-parent="#dependencia">
                            <div className="accordion-body">
                                <p className={`text-secondary ${style.title_grado_dep}`}>Deja el cursor sobre el nivel para obtener más información</p>

                                <div className="form-check pb-2">
                                    <input className="form-check-input" type="radio" name="dependency" id="nivel" onChange={(e) => setDependency(e.target.value)} value="Nivel 1" checked={dependency === 'Nivel 1'}/>
                                    <label
                                        className="form-check-label fs-5"
                                        htmlFor="nivel"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Acompañamiento. Es independiente en tareas diarias y personales">
                                        Nivel 1 <span className="fa-solid fa-circle-info"></span>
                                    </label>
                                </div>
                                <div className="form-check pb-2">
                                    <input className="form-check-input" type="radio" name="dependency" id="nivel2" onChange={(e) => setDependency(e.target.value)} value="Nivel 2"checked={dependency === 'Nivel 2'} />
                                    <label
                                        className="form-check-label fs-5"
                                        htmlFor="nivel2"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Dependencia leve. Requiere ayuda para cosas puntuales en algún momento del día para la rutina o autonomía personal">
                                        Nivel 2 <span className="fa-solid fa-circle-info"></span>
                                    </label>
                                </div>
                                <div className="form-check pb-2">
                                    <input className="form-check-input" type="radio" name="dependency" id="nivel3" onChange={(e) => setDependency(e.target.value)} value="Nivel 3" checked={dependency === 'Nivel 3'} />
                                    <label
                                        className="form-check-label fs-5"
                                        htmlFor="nivel3"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Dependencia moderada. Requiere ayuda para actividades básicas, dos o tres veces al día">
                                        Nivel 3 <span className="fa-solid fa-circle-info"></span>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="dependency" id="nivel4" onChange={(e) => setDependency(e.target.value)} value="Nivel 4"checked={dependency === 'Nivel 4'} />
                                    <label
                                        className="form-check-label fs-5"
                                        htmlFor="nivel4"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Dependencia severa. Necesita el apoyo indispensable de otra persona por pérdida de autonómia física, mental o intelectual">
                                        Nivel 4 <span className="fa-solid fa-circle-info"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div>
            </div>

            {/* Select provincias */}
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="province" className="form-label fs-5">Provincia *</label>
                    <select className="form-control"
                        id="province"
                        required
                        onChange={(e) => setProvince(e.target.value)}
                        value={province}>
                        <option value="" disabled>Selecciona la provincia</option>
                        <option value="A Coruna">A Coruña</option>
                        <option value="Alava">Álava</option>
                        <option value="Albacete">Albacete</option>
                        <option value="Alicante">Alicante</option>
                        <option value="Almeria">Almería</option>
                        <option value="Asturias">Asturias</option>
                        <option value="Avila">Ávila</option>
                        <option value="Badajoz">Badajoz</option>
                        <option value="Baleares">Baleares</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Burgos">Burgos</option>
                        <option value="Caceres">Cáceres</option>
                        <option value="Cadiz">Cádiz</option>
                        <option value="Cantabria">Cantabria</option>
                        <option value="Castellon">Castellón</option>
                        <option value="Ciudad Real">Ciudad Real</option>
                        <option value="Cordoba">Córdoba</option>
                        <option value="Cuenca">Cuenca</option>
                        <option value="Girona">Girona</option>
                        <option value="Granada">Granada</option>
                        <option value="Guadalajara">Guadalajara</option>
                        <option value="Guipuzcoa">Guipúzcoa</option>
                        <option value="Huelva">Huelva</option>
                        <option value="Huesca">Huesca</option>
                        <option value="Jaen">Jaén</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Las Palmas">Las Palmas</option>
                        <option value="Leon">León</option>
                        <option value="Lleida">Lleida</option>
                        <option value="Lugo">Lugo</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Malaga">Málaga</option>
                        <option value="Murcia">Murcia</option>
                        <option value="Navarra">Navarra</option>
                        <option value="Ourense">Ourense</option>
                        <option value="Palencia">Palencia</option>
                        <option value="Pontevedra">Pontevedra</option>
                        <option value="Salamanca">Salamanca</option>
                        <option value="Segovia">Segovia</option>
                        <option value="Sevilla">Sevilla</option>
                        <option value="Soria">Soria</option>
                        <option value="Tarragona">Tarragona</option>
                        <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                        <option value="Teruel">Teruel</option>
                        <option value="Toledo">Toledo</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Valladolid">Valladolid</option>
                        <option value="Vizcaya">Vizcaya</option>
                        <option value="Zamora">Zamora</option>
                        <option value="Zaragoza">Zaragoza</option>
                        <option value="Ceuta">Ceuta</option>
                        <option value="Melilla">Melilla</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="location" className="form-label fs-5">Localidad *</label>
                <input type="text" className="form-control" id="location" onChange={(e) => setLocation(e.target.value)} value={location} />
            </div>



            <div className="mb-3">
                <label htmlFor="photo" className="form-label fs-5">Foto</label>
                {/* Llamamos a la función de subirfoto para que vaya ejecutándose antes de que se termine de rellenar el formulario */}
                <input className="form-control" type="file" id="photo" onChange={(e) => subirfoto(e.target.files[0])} />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-5">Otra información importante *</label>
                <textarea className="form-control" rows={10} cols={40} id="description" placeholder="Puedes añadir cualquier información / necesidad relevante para el acompañante" onChange={(e) => setDescription(e.target.value)} value={description} />
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <div>
                <button
                    type="submit"
                    className={`btn fs-5 ${style.botonGuardar}`}>
                    Guardar usuario
                </button>
            </div>
        </form >

    )
}

