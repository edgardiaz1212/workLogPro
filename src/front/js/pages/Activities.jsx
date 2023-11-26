import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Activities() {
    const { store, actions } = useContext(Context)


    return (
        <>
            <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
            <div className="container mt-3 border border-danger">
                <div className="input-group mb-3">
                    <span className="input-group-text">Fecha de la actividad</span>
                    <input
                        type="date"
                        className="form-control"
                        aria-label="Fecha de la actividad"
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Control de incidente</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el control de incidente"
                        aria-label="Control de incidente"
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Control de cambio COR</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el control de cambio COR"
                        aria-label="Control de cambio COR"
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Control de Cambio DCCE</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el control de cambio DCCE"
                        aria-label="Control de cambio DCCE"
                    />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Tecnico Energia</span>
                    <input type="text"
                        className="form-control"
                        placeholder="Nombre y apellido"
                        aria-label="Tecnico Energia" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Personal Infraestructura DCCE</span>
                    <input
                        className="form-control"
                        placeholder="Nombre y Apellido"
                        aria-label="Personal Infraestructura DCCE" />
                </div>


                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon6">Actividad </span>

                    <select
                        className="form-select"
                        aria-label="Actividad"
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

            </div>
        </>
    )
}
export default Activities