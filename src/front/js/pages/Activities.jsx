import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Activities() {
    const { store, actions } = useContext(Context)
    const [newActivity, setNewActivity] = useState({
        fecha_actividad: "",
        control_incidente: "",
        control_cambio_cor: "",
        control_cambio_dcce: "",
        tecnico_nombre_apellido: "",
        personal_infra_nombre_apellido: `${store.user.name} ${store.user.surname}`,
        actividad: "",
        actividad_satisfactoria: false,
    });

    //cuando se carga el componente por defecto coloca al que esta registrado
    useEffect(() => {
        setNewActivity((prevData) => ({
            ...prevData,
            personal_infra_nombre_apellido: `${store.user.name} ${store.user.surname}`,
        }));
    }, [store.user]);

    // const handleUpload = async () => {
    //     try {
    //         const formData = new FormData()

    //         formData.append("fecha_actividad", newActivity.fecha_actividad);
    //         formData.append("control_incidente", newActivity.control_incidente);
    //         formData.append("control_cambio_cor", newActivity.control_cambio_cor);
    //         formData.append("control_cambio_dcce", newActivity.control_cambio_dcce);
    //         formData.append("tecnico_nombre_apellido", newActivity.tecnico_nombre_apellido);
    //         formData.append("personal_infra_nombre_apellido", newActivity.personal_infra_nombre_apellido);
    //         formData.append("actividad", newActivity.actividad);
    //         formData.append("actividad_satisfactoria", newActivity.actividad_satisfactoria);

    //         const response = await actions.addActivity(formData)

    //         if (response.status === 201 || response.status === 200) {
    //             console.log("activity Uploaded:", {
    //                 newActivity,
    //             });
    //             return true
    //         } else {
    //             console.log("Error en Upload");
    //             return false
    //         }
    //     } catch (error) {
    //         console.log("Error en la solicitud de Upload:", error)
    //         return false;
    //     }
    // };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewActivity((prevData) => ({
            ...prevData,
            [name] : value,
        }));
    };

    const handleSave = async () => {
        // Validación de campos obligatorios
        if (!newActivity.fecha_actividad || !newActivity.tecnico_nombre_apellido || !newActivity.personal_infra_nombre_apellido) {
            toast.error("Por favor, complete todos los campos obligatorios.");
            console.log("Campos obligatorios faltantes");
            return;
        }
        try {
            const formData = new FormData()
            formData.append("fecha_actividad", newActivity.fecha_actividad);
            formData.append("control_incidente", newActivity.control_incidente);
            formData.append("control_cambio_cor", newActivity.control_cambio_cor);
            formData.append("control_cambio_dcce", newActivity.control_cambio_dcce);
            formData.append("tecnico_nombre_apellido", newActivity.tecnico_nombre_apellido);
            formData.append("personal_infra_nombre_apellido", newActivity.personal_infra_nombre_apellido);
            formData.append("actividad", newActivity.actividad);
            formData.append("actividad_satisfactoria", newActivity.actividad_satisfactoria)

            const response = await actions.addActivity(formData)

            if (response.status === 201 || response.status === 200) {
                toast.success("Equipo registrado")
                console.log("Equipo anadido")
            } else {
                toast.error("Error registrando")
            }

        } catch (error) {
            console.log("Error en la solicitud de Upload:", error)

        }
    }

    return (
        <>
            <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
            <div className="container mt-3 border border-danger">
                <div className="input-group mb-3">
                    <span className="input-group-text">Fecha de la actividad</span>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_actividad"
                        name="fecha_actividad"
                        onChange={handleChange}
                        value={newActivity.fecha_actividad}
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Control de incidente</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el control de incidente"
                        id="control_incidente"
                        name="control_incidente"
                        onChange={handleChange}
                        value={newActivity.control_incidente}
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Control de cambio COR</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el control de cambio COR"
                        id="control_cambio_cor"
                        name="control_cambio_cor"
                        onChange={handleChange}
                        value={newActivity.control_cambio_cor}
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Control de Cambio DCCE</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el control de cambio DCCE"
                        id="control_cambio_dcce"
                        name="control_cambio_dcce"
                        onChange={handleChange}
                        value={newActivity.control_cambio_dcce}
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Tecnico Energia</span>
                    <input type="text"
                        className="form-control"
                        placeholder="Nombre y apellido"
                        id="tecnico_nombre_apellido"
                        name="tecnico_nombre_apellido"
                        onChange={handleChange}
                        value={newActivity.tecnico_nombre_apellido} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Personal Infraestructura DCCE</span>
                    <input
                        className="form-control"
                        placeholder="Nombre y Apellido"
                        id="personal_infra_nombre_apellido"
                        name="personal_infra_nombre_apellido"
                        onChange={handleChange}
                        value={newActivity.personal_infra_nombre_apellido} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon6">Actividad </span>
                    <select
                        className="form-select"
                        id="actividad"
                        name="actividad"
                        onChange={handleChange}
                        value={newActivity.actividad}
                    >
                        <option value="">Seleccionar Actividad</option>
                        <option value="1"> Mantenimiento motognerador</option>
                        <option value="1.1">Prueba con carga</option>
                        <option value="1.2">Mantenimiento preventivo</option>
                        <option value="2">Mantenimiento transfer</option>
                        <option value="3">Mantenimiento tableros electronicos</option>
                        <option value="4">Mantenimiento extratores</option>
                        <option value="5">Mantenimiento baterias UPS</option>
                        <option value="6">Mantenimiento transformadores</option>
                        <option value="7">Mantenimiento A/A de precisión</option>
                    </select>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Actividad Satisfactoria?</span>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="actividad_satisfactoria"
                        name="actividad_satisfactoria"
                        value={newActivity.actividad_satisfactoria}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="actividad_satisfactoria">
                        Si
                    </label>

                </div>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Guardar
                </button>
            </div>
        </>
    )
}
export default Activities