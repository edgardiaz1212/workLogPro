const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:localStorage.getItem("token") || null,
			user: JSON.parse(localStorage.getItem("user")) || [],
			processedData: "",
			temperatures: [],
			allTemperatures:[]
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
						
						localStorage.setItem("user", JSON.stringify(data.user));
						localStorage.setItem("token", data.token)
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
						// Devolver los datos procesados directamente

						return { activities: data.activities };
					  } else {
						console.error("Error al obtener actividades por año:", response.statusText);
						return { error: response.statusText };
					  }
					} catch (error) {
					  console.error("Error al obtener actividad por año", error);
					  return { error };
					}
				  },
			getYears: async () => {
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
			logout: () => {
				localStorage.removeItem("user");
				setStore({ token: "", user: "" });
			},

			addDocument:async(document)=>{
				const store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/documents`, {
						method: "POST",
						body: JSON.stringify(document), // Convierte el objeto a JSON
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`,
						},
					})

					let data = await response.json()
					if (!response.ok) {
						console.error("Error Registering Document:", data.msg || "Unknown error");
					}
					return data

				} catch (error) {
					console.log("Error registering document:", error);
					return 500;
				}
			},
			
			addMaintenanceEvidence: async (activityId, formData) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/add-maintenance-evidence/${activityId}`, {
						method: "POST",
						headers: {
							"Authorization": `Bearer ${store.token}`,
						},
						body: formData,
					});
			
					if (response.ok) {
						return response.json();  // Devuelve los datos de la respuesta si es necesario
					} else {
						console.error("Error adding maintenance evidence:", response.statusText);
						return 500;
					}
				} catch (error) {
					console.error("Error adding maintenance evidence:", error);
					return 500;
				}
			},

			getUserProfile: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/user/profile`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ profile: data }); // Almacenar los datos del perfil en el store
					} else {
						console.error("Error getting user profile:", response.statusText);
					}
				} catch (error) {
					console.error("Error getting user profile:", error);
				}
			},
			updateUserProfile: async (updatedProfile) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/user/profile`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify(updatedProfile)
					});

					if (response.ok) {
						// Actualizar el perfil en el store con los datos actualizados
						await getActions().getUserProfile();
						console.log("User profile updated successfully");
					} else {
						console.error("Error updating user profile:", response.statusText);
					}
				} catch (error) {
					console.error("Error updating user profile:", error);
				}
			},
			addTemperature: async (temperatureData) => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/temperatures`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${store.token}`  // Asegúrate de tener un mecanismo de autenticación
                        },
                        body: JSON.stringify(temperatureData)
                    });

                    if (response.ok) {
                        // Actualiza la lista de temperaturas en el estado
                        setStore({
                            temperatures: [...store.temperatures, temperatureData]
                        });

                        return response;
                    } else {
                        console.error("Error adding temperature:", response.statusText);
                        return response;
                    }
                } catch (error) {
                    console.error("Error adding temperature:", error);
                    return error;
                }
            },
			editTemperature: async (id, updatedTemperatureData) => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/temperatures/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${store.token}`
                        },
                        body: JSON.stringify(updatedTemperatureData)
                    });

                    if (response.ok) {
                        // Actualiza la lista de temperaturas en el estado
                        const updatedTemperatures = store.temperatures.map(temp => 
                            temp.id === id ? { ...temp, ...updatedTemperatureData } : temp
                        );

                        setStore({
                            temperatures: updatedTemperatures
                        });

                        return response;
                    } else {
                        console.error("Error updating temperature:", response.statusText);
                        return response;
                    }
                } catch (error) {
                    console.error("Error updating temperature:", error);
                    return error;
                }
            },
			deleteTemperature: async (id) => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/temperatures/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${store.token}`
                        }
                    });

                    if (response.ok) {
                        // Actualiza la lista de temperaturas en el estado eliminando el elemento correspondiente
                        const updatedTemperatures = store.temperatures.filter(temp => temp.id !== id);

                        setStore({
                            temperatures: updatedTemperatures
                        });

                        return response;
                    } else {
                        console.error("Error deleting temperature:", response.statusText);
                        return response;
                    }
                } catch (error) {
                    console.error("Error deleting temperature:", error);
                    return error;
                }
            },
			getAllTemperatures: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/all-temperatures`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${store.token}`,
						},
					});
	
					if (response.ok) {
						const data = await response.json();
						// Actualiza el estado del almacén con todas las temperaturas
						setStore({
							allTemperatures: data.temperatures,
						});
						return data;
					} else {
						console.error('Error al obtener todas las temperaturas:', response.statusText);
						return { error: response.statusText };
					}
				} catch (error) {
					console.error('Error al obtener todas las temperaturas:', error);
					return { error };
				}
			},


		}
	};
};

export default getState;
