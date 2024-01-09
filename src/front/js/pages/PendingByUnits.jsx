import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function PendingByUnits() {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        provider:'',
        description: '',
        request_date: '',
        status: '',
        ticket_associated: '',
        finished: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realizar la solicitud para registrar la nueva actividad pendiente
        try {
            const response = await actions.registerPendingActivityByUnits(formData);

            // Verificar la respuesta del backend
            if (response && response.msg) {
                // Mostrar mensaje de éxito
                toast.success(response.msg);

                // Limpiar el formulario después de un registro exitoso
                setFormData({
                    provider:'',
                    description: '',
                    request_date: '',
                    status: '',
                    ticket_associated: '',
                    finished: false,
                });
            } else {
                // Mostrar mensaje de error si no hay una respuesta exitosa
                toast.error('Error al registrar la actividad pendiente');
            }
        } catch (error) {
            console.error('Error para registrar la actividad pendiente:', error);
            // Mostrar mensaje de error en caso de una excepción
            toast.error('Error inesperado al registrar la actividad pendiente');
        }
    };

    return (
        <>
            <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
            <div className="container">
                <div className="section-title mt-3">
                    <h2>Formulario de Actividades Pendientes de Proveedores</h2>
                </div>
                <div className='row'>
                    <div className="col-lg-7 mx-auto ">
                        <form className="text-center" onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="actividad">Actividad</label>
                                <select
                                    className="form-select"
                                    id="actividad"
                                    name="actividad"
                                    onChange={handleChange}
                                    value={formData.provider}
                                >
                                    <option value="">Seleccionar Proveedor</option>
                                    <option value="1"> Energia Operaciones y Mantenimiento</option>
                                    <option value="1.1">Servicios y Logisticas</option>
                                    <option value="1.2">Seguridad Fisica</option>
                                    <option value="2">Infraestructura</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Descripción</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Fecha de Solicitud</span>
                                <input
                                    type="date" // Puedes cambiar esto a un campo de fecha según tus necesidades
                                    className="form-control"
                                    name="request_date"
                                    value={formData.request_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Estatus</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Ticket Asociado</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ticket_associated"
                                    value={formData.ticket_associated}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="finished"
                                        checked={formData.finished}
                                        onChange={(e) => setFormData({ ...formData, finished: e.target.checked })}
                                    />
                                    <label className="form-check-label" htmlFor="finished">Finalizado</label>
                                </div>
                            </div>
                            <button className='btn btn-primary' type="submit">Registrar Actividad Pendiente</button>
                        </form>
                    </div>
                    <div className="col-lg-12">
                        tablas
                    </div>
                </div>
            </div>
        </>
    );
}

export default PendingByUnits;
