const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: localStorage.getItem("users") || null,
			token: localStorage.getItem("token") || null,
			userId: localStorage.getItem('userId') || '',
			email: localStorage.getItem("email") || null,
			username: localStorage.getItem("username") || null,
			role: localStorage.getItem("role") || null,
			name: localStorage.getItem("name") || null,
			lastname: localStorage.getItem("lastname") || null,
			phone: localStorage.getItem("phone") || null,
			location: localStorage.getItem("location") || null,
		},

		actions: {

			logIn: async (email, password) => {
				const store = getStore()
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						body: JSON.stringify({ email, password }),
						headers: { "Content-Type": "application/json" }
					});
					const data = await resp.json();

					if (data.token) {

						localStorage.setItem('token', data.token);
						localStorage.setItem('username', data.username);
						localStorage.setItem('email', data.email);
						localStorage.setItem('userId', data.id);
						localStorage.setItem('role', data.role);
						setStore({ ...store, token: data.token, email: data.email, userId: data.id, username: data.username, role: data.role });
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
						// Guardar el token en localStorage
						localStorage.setItem('token', data.access_token);
						localStorage.setItem('username', data.username);
						localStorage.setItem('email', data.email);
						localStorage.setItem('userId', data.id);
						localStorage.setItem('role', data.role);
						setStore({ ...store, token: data.access_token, email: data.email, userId: data.id, username: data.username, role: data.role });
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
				localStorage.removeItem("token");
				setStore({ ...store, token: '', email: '', userId: '', username: '', role: '' });
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

				if (!store.userId) {
					console.error('User ID is not available');
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${store.userId}`);
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const data = await response.json();
					setStore({ ...store, name: data.name, lastname: data.lastname, email: data.email, phone: data.phone, location: data.location });
					localStorage.setItem('name', data.name);
					localStorage.setItem('lastname', data.lastname);
					localStorage.setItem('email', data.email);
					localStorage.setItem('phone', data.phone);
					localStorage.setItem('location', data.location);
				} catch (error) {
					console.error('There was an error fetching the user details!', error);
				}
			},
			editUser: async (name, lastname, email, phone, location) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/edit/${store.userId}`, {
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
			}

		}
	};
};

export default getState;
