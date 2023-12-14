import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TenRegistryEnergy from "../component/TenRegistryEnergy.jsx";

function RegisterEnergy() {
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
        tipo_de_mantenimiento: "",
        observaciones: ""
    });
    // Estado para rastrear los errores
    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        fecha_actividad: false,
        tecnico_nombre_apellido: false,
        personal_infra_nombre_apellido: false,
        // ... (agrega más campos según sea necesario)
    })

    //cuando se carga el componente por defecto coloca al que esta registrado
    useEffect(() => {
        setNewActivity((prevData) => ({
            ...prevData,
            personal_infra_nombre_apellido: `${store.user.name} ${store.user.surname}`,
        }));
    }, [store.user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Marcar el campo como no erróneo cuando se empieza a escribir
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));

        const updatedValue = type === "radio" ? value === "true" : value;

        setNewActivity((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };

    const handleSave = async () => {
        // Validación de campos obligatorios
        if (!newActivity.fecha_actividad || !newActivity.tecnico_nombre_apellido || !newActivity.personal_infra_nombre_apellido) {
            toast.error("Por favor, complete todos los campos obligatorios.");
            console.log("Campos obligatorios faltantes");
            // Marcar los campos faltantes como erróneos
            setErrors({
                fecha_actividad: !newActivity.fecha_actividad,
                tecnico_nombre_apellido: !newActivity.tecnico_nombre_apellido,
                personal_infra_nombre_apellido: !newActivity.personal_infra_nombre_apellido,
                // ... (agrega más campos según sea necesario)
            });
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
            formData.append("tipo_de_mantenimiento", newActivity.tipo_de_mantenimiento)
            formData.append("observaciones", newActivity.observaciones)

            const response = await actions.addActivity(newActivity)

            if (response.status === 201 || response.status === 200) {
                toast.success("Actividad registrada")
                console.log("Actividad anadido")
                // Restablecer los campos al estado inicial
                setNewActivity({
                    fecha_actividad: "",
                    control_incidente: "",
                    control_cambio_cor: "",
                    control_cambio_dcce: "",
                    tecnico_nombre_apellido: "",
                    personal_infra_nombre_apellido: `${store.user.name} ${store.user.surname}`,
                    actividad: "",
                    actividad_satisfactoria: false,
                    tipo_de_mantenimiento: "",
                    observaciones: ""
                });
            } else {
                toast.error("Error registrando")
                console.error("Error del servidor:", response.statusText);
            }

        } catch (error) {
            console.log("Error en la solicitud de Upload:", error)

        }
    }
    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
            <div className="section-title mt-3">
                <h2>Registro Actividades de la Gerencia de Energia</h2>
            </div>
            <div className="container  ">
                <div className="row  ">
                    <div className="col-6 g-5 ">
                        <div className={`input-group mb-3 ${errors.fecha_actividad ? 'error' : ''}`}>
                            <span className="input-group-text">Fecha de la actividad</span>
                            <input
                                type="date"
                                className={`form-control ${errors.fecha_actividad ? 'error' : ''}`}
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

                        <div className={`input-group mb-3 ${errors.tecnico_nombre_apellido ? 'error' : ''}`}>
                            <span className="input-group-text">Tecnico Energia</span>
                            <input type="text"
                                className={`form-control ${errors.tecnico_nombre_apellido ? 'error' : ''}`}
                                placeholder="Nombre y apellido"
                                id="tecnico_nombre_apellido"
                                name="tecnico_nombre_apellido"
                                onChange={handleChange}
                                value={newActivity.tecnico_nombre_apellido} />
                        </div>

                        <div className={`input-group mb-3 ${errors.personal_infra_nombre_apellido ? 'error' : ''}`}>
                            <span className="input-group-text">Personal Infraestructura DCCE</span>
                            <input
                                className={`form-control ${errors.personal_infra_nombre_apellido ? 'error' : ''}`}
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

                        <div className="input-group mb-3 ">
                            <span className="input-group-text">Actividad Satisfactoria?</span>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="actividad_satisfactoria_si"
                                    name="actividad_satisfactoria"
                                    value={true}
                                    checked={newActivity.actividad_satisfactoria === true}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="actividad_satisfactoria_si">
                                    Si
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="actividad_satisfactoria_no"
                                    name="actividad_satisfactoria"
                                    value={false}
                                    checked={newActivity.actividad_satisfactoria === false}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="actividad_satisfactoria_no">
                                    No
                                </label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon6">Tipo de Mantenimiento </span>
                            <select
                                className="form-select"
                                id="tipo_de_mantenimiento"
                                name="tipo_de_mantenimiento"
                                onChange={handleChange}
                                value={newActivity.tipo_de_mantenimiento}
                            >
                                <option value="">Seleccionar Mantenimiento</option>
                                <option value="Mantenimiento Preventivo"> Mantenimiento Preventivo</option>
                                <option value="Mantenimiento Correctivo">Mantenimiento Correctivo</option>

                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Observaciones</span>
                            <textarea
                                type="text"
                                className="form-control"
                                id="observaciones"
                                name="observaciones"
                                onChange={handleChange}
                                value={newActivity.observaciones}
                            ></textarea>
                        </div>
                        <div className="m-2">
                            <button type="button" className="btn btn-primary" onClick={handleSave}>
                                Guardar
                            </button>
                            <button type="button" className="btn btn-secondary ms-3" onClick={goBack}>
                                Volver
                            </button>
                        </div>
                    </div>
                    <div className="col-5 border border-danger">
<TenRegistryEnergy/>
                    </div>
                </div>
            </div>

        </>
    )
}
export default RegisterEnergy