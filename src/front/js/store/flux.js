
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: JSON.parse(localStorage.getItem("users")) || null,
			userData: JSON.parse(localStorage.getItem("userData")) || {
				token: null,
				userId: null,
				email: null,
				username: null,
				role: null,
				name: null,
				lastname: null,
				phone: null,
				location: null,
			},

			familiares: JSON.parse(localStorage.getItem("userFamily")) || [],
			companions: JSON.parse(localStorage.getItem("companions")) || [],


			ads: JSON.parse(localStorage.getItem("ads")) || null,
			ads: JSON.parse(localStorage.getItem("ads")) || [],
			adData: JSON.parse(localStorage.getItem("adData")) || [],
			singleAd: [],
			adElegido: {}
		},

		actions: {

			logIn: async (email, password) => {
				const store = getStore();
				localStorage.removeItem('adData');
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						body: JSON.stringify({ email, password }),
						headers: { "Content-Type": "application/json" }
					});

					const data = await resp.json();

					if (data.token) {
						// Agrupar todos los datos del usuario en un objeto
						const userData = {
							token: data.token,
							username: data.username,
							email: data.email,
							userId: data.id,
							role: data.role,
							name: data.name || '',
							lastname: data.lastname || '',
							phone: data.phone || '',
							location: data.location || ''
						};

						// Guardar el objeto en localStorage
						localStorage.setItem('userData', JSON.stringify(userData));

						// Actualizar el store con los datos del usuario
						setStore({
							...store,
							userData: userData,
							adData: []
						});

						console.log("Success:", data);
					} else {
						console.error("Token no recibido:", data);
					}
				} catch (error) {
					console.error("Network error:", error);
				}
			},

			signUp: async (email, password, username, role) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						body: JSON.stringify({ email, password, username, role }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!resp.ok) {
						const errorData = await resp.json();
						console.error("Error:", errorData);
						return errorData;
					}

					const data = await resp.json();

					if (data.access_token) {
						// Agrupar todos los datos del usuario en un objeto
						const userData = {
							token: data.access_token,
							username: data.username,
							email: data.email,
							userId: data.id,
							role: data.role
						};

						// Guardar el objeto en localStorage
						localStorage.setItem('userData', JSON.stringify(userData));

						// Actualizar el store
						setStore({
							...store,
							userData: userData
						});
						console.log("Success:", data);
					} else {
						console.error("Token no recibido:", data);
					}
				} catch (error) {
					// Manejo de errores de red u otros errores
					console.error("Network error:", error);
				}
			},

			logOut: () => {
				const store = getStore();

				// Elimina el objeto completo de userData del localStorage
				localStorage.removeItem("userData");
				localStorage.removeItem("adData");

				setStore({
					...store,
					userData: {
						token: null,
						userId: '',
						email: null,
						username: null,
						role: null,
						name: null,
						lastname: null,
						phone: null,
						location: null,
					},
					adData: []
				});
			},

			getUsers: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: "GET"
					});
					const data = await resp.json();
					console.log("Datos recibidos de la API:", data);
					setStore({ users: data.users });
				} catch (error) {
					console.log(error);
				}
			},

			getUserDetails: async () => {
				const store = getStore();
				const actions = getActions();

				if (!store.userData.userId) {
					console.error('User ID is not available');
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${store.userData.userId}`);
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const data = await response.json();
					console.log("Datos del usuario recibidos:", data);
					if (data) {
						// Agrupar todos los datos del usuario en un objeto
						const userDataDetails = {
							...store.userData,
							email: data.email,
							name: data.name || '',
							lastname: data.lastname || '',
							phone: data.phone || '',
							location: data.location || ''
						};

						// Guardar el objeto en localStorage
						localStorage.setItem('userData', JSON.stringify(userDataDetails));

						// Actualizar el store
						setStore({
							...store,
							userData: userDataDetails
						});
						console.log("Store actualizado:", getStore());
					}
				} catch (error) {
					console.error('There was an error fetching the user details!', error);
				}
			},

			editUser: async (name, lastname, email, phone, location) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/edit/${store.userData.userId}`, {
						method: "PUT",
						body: JSON.stringify({ name, lastname, email, phone, location }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const data = await response.json();
					// Actualiza el usuario en la lista existente
					setStore({ ...store, users: store.users.map(user => (user.id === id ? data : user)) });
					console.log('User updated successfully:', data);
				} catch (error) {
					console.error('There was an error updating the user:', error);
				}
			},

			createAd: async (type, startDate, endDate, price, title, description, status = "pending", active) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/create_ad/${store.userData.userId}`, {
						method: "POST",
						body: JSON.stringify({
							type: type,
							start_date: startDate,
							end_date: endDate,
							max_cost: price,
							title: title,
							description: description,
							created_at: new Date().toISOString(), // Enviar la fecha actual como ISOString
							status: status,
							active: active

						}),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!resp.ok) {
						const errorData = await resp.json();
						console.error("Error:", errorData);
						return errorData;
					}

					const data = await resp.json();

					if (data) {
						// Agrupar todos los datos del usuario en un objeto
						// Guardar el objeto en localStorage
						localStorage.setItem('adData', JSON.stringify(data));

						// Actualizar el store
						setStore({
							...store,
							adData: data
						});
						console.log("Success:", data);
					} else {
						console.error("Datos no recibidos:", data);
					}
				} catch (error) {
					// Manejo de errores de red u otros errores
					console.error("Network error:", error);
				}
			},

			getUserAds: async () => {
				const store = getStore();
				const actions = getActions();

				if (!store.userData.userId) {
					console.error('User ID is not available');
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ads/${store.userData.userId}`);
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const data = await response.json();
					console.log("Datos de los anuncios recibidos:", data);
					if (Array.isArray(data)) {
						setStore({
							...store,
							adData: data  // Guardamos la lista completa de anuncios en el store
						});

						localStorage.setItem('adData', JSON.stringify(data));

						console.log("Store actualizado:", store);
					}
				} catch (error) {
					console.error('There was an error fetching the ad details!', error);
				}
			},

			deleteAd: async (adId) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ad/delete/${adId}`, {
						method: 'DELETE',
					});

					if (response.ok) {
						console.log('Anuncio eliminado con éxito');
						const updatedAds = store.adData.filter(ads => ads.id !== adId);
						setStore({
							...store,
							adData: updatedAds
						})
						localStorage.setItem('adData', JSON.stringify(updatedAds));
					} else {
						console.error('Error al eliminar el anuncio');
					}
				} catch (error) {
					console.error('Error en la solicitud de eliminación:', error);
				}
			},

			getAds: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/ads`, {
						method: "GET"
					});
					const data = await resp.json();
					console.log("Datos recibidos de la API:", data);
					if (Array.isArray(data)) {
						setStore({ ads: data }); // Asegúrate de que sea un array
						localStorage.setItem('ads', JSON.stringify(data));
					} else {
						console.error('Data from API is not an array');
					}
				} catch (error) {
					console.log(error);
				}
			},

			getSingleAd: async (adId) => {
				const store = getStore();
				const actions = getActions();


				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ad/user/${adId}`);
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const data = await response.json();
					console.log("Datos de un anuncio:", data);
					setStore({ singleAd: data });
					localStorage.setItem('singleAd', JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			},

			editAd: async (id, type, startDate, endDate, price, title, description) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ad/edit/${id}`, {
						method: "PUT",
						body: JSON.stringify({
							type: type,
							start_date: startDate,
							end_date: endDate,
							max_cost: price,
							title: title,
							description: description
						}),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const data = await response.json();

					const updatedAd = data.ad;

					setStore({
						...store,
						ads: store.ads.map(ad =>
							ad.id === id ? updatedAd : ad
						)
					});
				} catch (error) {
					console.error('There was an error updating the ad:', error);
				}
			},

			selectedAd: (id) => {
				const store = getStore();
				
				// Asegurarnos de que `store.ads` sea un array antes de buscar el anuncio
				if (Array.isArray(store.ads) && store.ads.length > 0) {
					const adSeleccionado = store.ads.find((ad) => ad.id === id);
					
					if (adSeleccionado) {
						// Guardar el anuncio seleccionado en el store
						setStore({ adElegido: adSeleccionado });
					} else {
						// Si no se encuentra el anuncio, almacenar null o un estado claro
						console.error('No se encontró un anuncio con el ID especificado');
						setStore({ adElegido: null });
					}
				} else {
					console.error('Ads list is empty or not an array');
					setStore({ adElegido: null }); // Indicando claramente que no hay anuncios seleccionados
				}
			},
			anadir_familiar: async (name, alias, lastname, phone, description, birthdate, dependency, province, location, photo, user_id) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/anadir_familiar`, {
						method: 'POST',
						body: JSON.stringify({ name, alias, lastname, phone, description, birthdate, dependency, province, location, photo, user_id }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const nuevoFamiliar = await response.json();

					setStore({
						...store,
						familiares: [...store.familiares, nuevoFamiliar] // Añade el nuevo familiar a la lista
					});
				}
				catch (error) {
					// Manejo de errores de red u otros errores
					console.error("Network error:", error);
				}

			},

			getFamiliarDetalles: async () => {
				const store = getStore();

				if (!store.userData.userId) {
					console.error('User ID is not available');
					return;
				}


				/**
				 * 
				 * 	Se hace la llamada con el fetch a la función que haya en el backend en el @api.route y espera la respuesta. 
					Si la respuesta NO es ok se lanza error. 
					Si es correcta, se genera la variable data que recibe la respuesta correcta en formato json. 
					Si data (es decir, si tiene datos), se crea un objeto familiarDetalles el cual va a guardar en el array
					familiares que hay en el store  y también los datos (data) recibidos por parte del backend
				 */
				try {
					const respuesta = await fetch(`${process.env.BACKEND_URL}/api/user/${store.userData.userId}/fam_user`);
					if (!respuesta.ok) {
						throw new Error(`HTTP error! status: ${respuesta.status}`);
					}
					const data = await respuesta.json();
					console.log("Datos del familiar del usuario recibidos:", data);
					if (Array.isArray(data)) {
						// Guardar en localStorage directamente el array de familiares
						localStorage.setItem('userFamily', JSON.stringify(data));

						// Actualizar el store con el array de familiares
						setStore({
							...store,
							familiares: data
						});
						console.log("Store actualizado:", getStore());
					} else {
						console.error('Los datos recibidos no son un array:', data);
					}

				} catch (error) {
					console.error('There was an error fetching the user details!', error);
				}
			},

			// Para editar el formulario de un familiar que ya existe previamente. 
			editar_familiar: async (name, alias, lastname, phone, description, birthdate, dependency, province, location, photo, id) => {
				const store = getStore();

				try {
					const respuesta = await fetch(`${process.env.BACKEND_URL}/api/user/${id}/edit_fam_user`, {
						method: 'PUT',
						body: JSON.stringify({ name, alias, lastname, phone, description, birthdate, dependency, province, location, photo }),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (!respuesta.ok) {
						const errorData = await respuesta.json();
						console.error("Error:", errorData);
						return errorData;
					}
					const data = await respuesta.json();

					// Asegúrate de que el familiar actualizado esté en el campo "familiar" de la respuesta
					const updatedFamiliar = data.familiar;

					// Actualiza el estado global con el familiar actualizado
					setStore({
						...store,
						familiares: store.familiares.map(familiar =>
							familiar.id === id ? updatedFamiliar : familiar
						)
					});
					console.log('Familiar actualizado correctamente');
				} catch (error) {
					console.error('Error ocurrido en la actualización del familiar', error);
				}

			},

			eliminar_familiar: async (id) => {
				const store = getStore();

				try {
					const respuesta = await fetch(`${process.env.BACKEND_URL}/api/user/${id}/delete_fam_user`, {
						method: 'DELETE',
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (!respuesta.ok) {
						const errorData = await respuesta.json();
						console.error("Error:", errorData);
						return errorData;
					}
					const data = await respuesta.json();


					// Actualiza el estado global para eliminar el familiar
					setStore({
						...store,
						familiares: store.familiares.filter(familiar => familiar.id !== id)
					});

					console.log('Familiar actualizado correctamente');
				} catch (error) {
					console.error('Error ocurrido en la actualización del familiar', error);
				}

			},

			anadir_companion: async (description, photo, location, province, birthdate, experience, service_cost, user_id, availability_hours = false, availability_days = false, availability_weeks = false, availability_live_in = false, facebook = '', instagram = '', twitter = '', linkedin = '') => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/anadir_companion`, {
						method: 'POST',
						body: JSON.stringify({
							description,
							photo,
							location,
							province,
							birthdate,
							experience,
							service_cost,
							user_id,
							availability_hours,
							availability_days,
							availability_weeks,
							availability_live_in,
							facebook,
							instagram,
							twitter,
							linkedin
						}),
						headers: {
							"Content-Type": "application/json"
						}
					});
			
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
			
					const nuevoCompanion = await response.json();
			
					setStore({
						...store,
						companions: [...store.companions, nuevoCompanion] // Añade el nuevo companion a la lista
					});
				}
				catch (error) {
					// Manejo de errores de red u otros errores
					console.error("Network error:", error);
				}
			},
			

			

		}
	};
};

export default getState;


