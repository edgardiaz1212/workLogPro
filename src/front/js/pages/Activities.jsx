import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Activities() {
    const { store, actions } = useContext(Context)
    //cuando se carga el componente por defecto coloca al que esta registrado
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            personal_infra_nombre_apellido: `${store.user.name} ${store.user.surname}`,
        }));
    }, [store.user]);

    const [formData, setFormData] = useState({
        fecha_actividad: "",
        control_incidente: "",
        control_cambio_cor: "",
        control_cambio_dcce: "",
        tecnico_nombre_apellido: "",
        personal_infra_nombre_apellido: `${store.user.name} ${store.user.surname}`,
        actividad: "",
        actividad_satisfactoria: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = async () => {
        // Validación de campos obligatorios
        if (!formData.fecha_actividad || !formData.tecnico_nombre_apellido || !formData.personal_infra_nombre_apellido) {
            toast.error("Por favor, complete todos los campos obligatorios.");
            return;
        }
try {
    const formData = new FormData();

    formData.append(fecha_actividad)
    formData.append(control_incidente)
    formData.append(control_cambio_cor)
    formData.append(tecnico_nombre_apellido)
    formData.append(personal_infra_nombre_apellido)
    formData.append(actividad)
    formData.append(actividad_satisfactoria)


    const response = await actions.addActivity(formData);
        console.log(response)
        if (response.ok) {
            const data =await response.json()

            toast.success("Actividad guardada exitosamente.");
            // Limpiar el formulario después de guardar
            setFormData({
                fecha_actividad: "",
                control_incidente: "",
                control_cambio_cor: "",
                control_cambio_dcce: "",
                tecnico_nombre_apellido: "",
                personal_infra_nombre_apellido: `${store.user.name}` `${store.user.surname}`,
                actividad: "",
                actividad_satisfactoria: false,
            });
        } else {
            
            console.error("Error del servidor:");
            toast.error("Error al guardar la actividad. Por favor, inténtelo de nuevo.");
        }
} catch (error) {
    console.error("Error durante la solicitud:", error);
        toast.error("Error al procesar la solicitud. Por favor, inténtelo de nuevo.");
}
        // Realizar la llamada a la función addActivity del store
        
    };
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
                        value={formData.fecha_actividad}
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
                        value={formData.control_incidente}
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
                        value={formData.control_cambio_cor}
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
                        value={formData.control_cambio_dcce}
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
                        value={formData.tecnico_nombre_apellido} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Personal Infraestructura DCCE</span>
                    <input
                        className="form-control"
                        placeholder="Nombre y Apellido"
                        id="personal_infra_nombre_apellido"
                        name="personal_infra_nombre_apellido"
                        onChange={handleChange}
                        value={formData.personal_infra_nombre_apellido} />
                </div>


                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon6">Actividad </span>

                    <select
                        className="form-select"
                        id="actividad"
                        name="actividad"
                        onChange={handleChange}
                        value={formData.actividad}
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
                        checked={formData.actividad_satisfactoria}
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