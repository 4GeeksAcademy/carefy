const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || null,
			userId: sessionStorage.getItem('userId') || '',
			email: sessionStorage.getItem("email") || null,
			username: sessionStorage.getItem("username") || null,
			role: sessionStorage.getItem("role") || null
		},

		actions: {
			
			logIn : async (email, password) => {
				const store = getStore()
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						body: JSON.stringify({email, password }),
						headers: { "Content-Type": "application/json" }
					});
					const data = await resp.json();
		
					if (data.token) {
		
						sessionStorage.setItem('token', data.token);
						sessionStorage.setItem('username', data.username);
						sessionStorage.setItem('email', data.email);
						sessionStorage.setItem('userId', data.id);
						sessionStorage.setItem('role', data.role);
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
						// Guardar el token en sessionStorage
						sessionStorage.setItem('token', data.access_token);
						sessionStorage.setItem('username', data.username);
						sessionStorage.setItem('email', data.email);
						sessionStorage.setItem('userId', data.id);
						sessionStorage.setItem('role', data.role);
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
				sessionStorage.removeItem("token");
				setStore({ ...store, token: '', email: '', userId: '', username: '', role: '' });
			},
		}
	};
};

export default getState;
