const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
			userData: JSON.parse(localStorage.getItem("userData")) || [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			registerUser: async (user) => {

				const store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/user`, {
						method: "POST",
						body: user
					})

					let data = await response.json()
					return response.status

				} catch (error) {
					console.log("Error registering user:", error);
					return 500;
				}
			},
			loginUser: async (email, password) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/login`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				  });
		
				  const data = await response.json();
		
				  if (response.ok) {
					setStore({ user: data.user });
					// Puedes realizar otras acciones aquí, como redireccionar a otra página
				  } else {
					// Manejar errores, mostrar mensajes, etc.
					console.error("Error logging in:", data.message);
				  }
		
				  return response.status;
				} catch (error) {
				  console.error("Error logging in:", error);
				  return 500;
				}
			  },
			getUserData: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/user/by-alias`, {
						method: "GET",
						headers: {
							"Content-Type": "aplication/json",
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (response.ok) {
						const responseData = await response.json();
						console.log("User data:", responseData);
						setStore({ userData: responseData });
						localStorage.setItem("userData", JSON.stringify(responseData));
					} else {
						console.log("Error fetching user data:", response.status);
					}
				} catch (error) {
					console.log("Error fetching user data:", error);
				}
			},

			
		}
	};
};

export default getState;
