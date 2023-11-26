const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
			user: JSON.parse(localStorage.getItem("user")) || [],
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
					if (!response.ok) {
						console.error("Error registering user:", data.msg || "Unknown error");
					}
					return data

				} catch (error) {
					console.log("Error registering user:", error);
					return 500;
				}
			},
			loginUser: async (body) => {
				const store = getStore()
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(body),
					});

					const data = await response.json();

					const result = {
						status: response.status,
						data: data,
					};

					if (response.ok) {
						setStore({
							user: data.user,
							token: data.token
						});
						localStorage.setItem("token", data.token)
						localStorage.setItem("user", JSON.stringify(data.user));
						console.log("Inicio de sesión exitoso!!")
					} else {
						// Manejar errores, mostrar mensajes, etc.
						console.error("Error logging in:", result);
					};
					return result;
				
				} catch (error)  {
					console.error("Error logging in:", error);
					return {
					  status: 500,
					  data: { message: "Error inesperado" },
					};
				  }
			},
			addActivity:async(body)=>{
				const store =getStore
				try {
					const response=await fetch(`${process.env.BACKEND_URL}/activity`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify(body)
					})
					const data = await response.json()
					if (response.ok){
						//se puede anadir alguna actividad adicional aca
					} else{
						console.log("Error adding activity:", data.message)
					}
					return response.ok
				} catch (error) {
					console.log("error anadir actividad", error)
				}
			}


		}
	};
};

export default getState;
