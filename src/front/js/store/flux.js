
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
			familiares: []
		},

		actions: {

			logIn: async (email, password) => {
				const store = getStore();
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
							userData: userData
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
					}
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


			anadir_familiar: async (name, alias, lastname, phone, description, birthdate, dependency, province, location, photo, user_id) => {
				try {
					const respuesta = await fetch(`${process.env.BACKEND_URL}/api/anadir_familiar`, {
						method: 'POST',
						body: JSON.stringify({ name, alias, lastname, phone, description, birthdate, dependency, province, location, photo, user_id }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!respuesta.ok) {
						const errorData = await respuesta.json();
						console.error("Error:", errorData);
						return errorData;
					}


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



		}
	};
};

export default getState;
