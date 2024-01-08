import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function PendingByUnits() {
    const [formData, setFormData] = useState({
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
                <form onSubmit={handleSubmit}>
                    <label>
                        Descripción:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Fecha de Solicitud:
                        <input
                            type="text" // Puedes cambiar esto a un campo de fecha según tus necesidades
                            name="request_date"
                            value={formData.request_date}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Estatus:
                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Ticket Asociado:
                        <input
                            type="text"
                            name="ticket_associated"
                            value={formData.ticket_associated}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Finalizado:
                        <input
                            type="checkbox"
                            name="finished"
                            checked={formData.finished}
                            onChange={(e) => setFormData({ ...formData, finished: e.target.checked })}
                        />
                    </label>
                    <br />
                    <button className='btn btn-primary' type="submit">Registrar Actividad Pendiente</button>
                </form>
            </div>
        </>
    );
}

export default PendingByUnits;
