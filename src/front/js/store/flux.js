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

				} catch (error) {
					console.error("Error logging in:", error);
					return {
						status: 500,
						data: { message: "Error inesperado" },
					};
				}
			},
			addActivity: async (body) => {
				const store = getStore()
				try {

					const response = await fetch(`${process.env.BACKEND_URL}/activity`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify(body)
					});

					if (response.ok) {
						return response;
						// Se puede añadir alguna actividad adicional aquí
					} else {
						console.log("Error adding equipment flux:", response.statusText)
					}
				} catch (error) {
					console.log("Error al añadir actividad", error);
					return 500
				}
			},
			graphYear: async (year) => {
				const store = getStore();
			  
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/activities-by-year/${year}`, {
					method: "GET",
					headers: {
					  "Authorization": `Bearer ${store.token}`,
					},
				  });
			  
				  if (response.ok) {
					const data = await response.json();
			  
					// Procesar los datos antes de actualizar el estado
					const processedData = data.activities.map(activity => {
					  // Extraer información adicional de la actividad
					  const { fecha_actividad, tipo_de_mantenimiento, actividad } = activity;
			  
					  // Extraer el mes y el año de la fecha de actividad
					  const fecha = new Date(fecha_actividad);
					  const month = fecha.toLocaleString('default', { month: 'long' });
					  const year = fecha.getFullYear();
			  
					  // Devolver la actividad con la información adicional
					  return {
						...activity,
						month,
						year,
					  };
					});
			  
					// Llama a la función de acción para actualizar el estado con los datos procesados
					setGraphYearData(processedData);
				  } else {
					console.error("Error al obtener actividades por año:", response.statusText);
				  }
				} catch (error) {
				  console.error("Error al obtener actividad por año", error);
				  return 500;
				}
			  },
			graphMonth: async (year, month) => {
				const store = getStore();

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/activities-by-month/${year}/${month}`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${store.token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();


						setGraphMonthData(data.activities);
					} else {
						console.error("Error al obtener actividades por mes", response.statusText);
					}
				} catch (error) {
					console.error("Error al obtener actividad por mes", error);
					return 500;
				}
			},
			getYears : async () => {
				const store = getStore();
			  
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/get-available-years`, {
					method: "GET",
					headers: {
					  "Authorization": `Bearer ${store.token}`,
					},
				  });
			  
				  if (response.ok) {
					const data = await response.json();
					return data.years;  // Ajusta según la estructura de tus datos
				  } else {
					console.error("Error al obtener años disponibles:", response.statusText);
					return [];
				  }
				} catch (error) {
				  console.error("Error al obtener años disponibles", error);
				  return [];
				}
			  },
		}
	};
};

export default getState;
