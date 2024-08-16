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
			adData: JSON.parse(localStorage.getItem("adData")) || [],
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

			createAd: async (startDate, endDate, price, title, description, status = "pending", active) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/create_ad/${store.userData.userId}`, {
						method: "POST",
						body: JSON.stringify({
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

			getSingleAd: async (adId) => {
				const store = getStore();
				const actions = getActions();

				if (!store.userData.userId) {
					console.error('User ID is not available');
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ad/user/${adId}`);
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const data = await response.json();
					console.log("Datos del anuncio recibidos:", data);
					if (data) {
						// Actualizar el store con los datos del anuncio
						setStore({
							...store,
							adData: data
						});

						// Guardar el anuncio en localStorage
						localStorage.setItem('adData', JSON.stringify(data));
					}
				} catch (error) {
					console.error('There was an error fetching the ad details!', error);
				}
			},
		}
	};
};

export default getState;
