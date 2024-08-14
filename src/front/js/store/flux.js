const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: sessionStorage.getItem("users") || null,
			token: sessionStorage.getItem("token") || null,
			userId: sessionStorage.getItem('userId') || '',
			email: sessionStorage.getItem("email") || null,
			username: sessionStorage.getItem("username") || null,
			role: sessionStorage.getItem("role") || null,
			name: sessionStorage.getItem("name") || null,
			lastname: sessionStorage.getItem("lastname") || null,
			phone: sessionStorage.getItem("phone") || null,
			location: sessionStorage.getItem("location") || null,
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

						sessionStorage.setItem('token', data.token);
						sessionStorage.setItem('username', data.username);
						sessionStorage.setItem('email', data.email);
						sessionStorage.setItem('userId', data.userId);
						sessionStorage.setItem('role', data.role);
						setStore({ ...store, token: data.token, email: data.email, userId: data.userId, username: data.username, role: data.role });
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
						// Guardar el token en sessionStorage
						sessionStorage.setItem('token', data.access_token);
						sessionStorage.setItem('username', data.username);
						sessionStorage.setItem('email', data.email);
						sessionStorage.setItem('userId', data.userId);
						sessionStorage.setItem('role', data.role);
						setStore({ ...store, token: data.access_token, email: data.email, userId: data.userId, username: data.username, role: data.role });
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
				sessionStorage.removeItem("token");
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
					sessionStorage.setItem('name', data.name);
					sessionStorage.setItem('lastname', data.lastname);
					sessionStorage.setItem('email', data.email);
					sessionStorage.setItem('phone', data.phone);
					sessionStorage.setItem('location', data.location);
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
