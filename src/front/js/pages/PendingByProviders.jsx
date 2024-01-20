import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PendingTablesProviders from "../component/PendingTablesProviders.jsx";

function PendingByProviders() {
    const { store, actions } = useContext(Context);
    const [pendingTables, setPendingTables] = useState([]);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
          try {
            const availableProviders = await actions.getAviableProviders();
            setProviders(availableProviders); 
            
          } catch (error) {
            console.error("Error al obtener proveedores:", error);
            toast.error("Error al obtener proveedores");
          }
        };
    
        fetchProviders();
      }, [actions]);
console.log(providers)

    const [newPending, setNewPending] = useState({
        provider: '',
        description: '',
        request_date: '',
        status: '',
        ticket_associated: '',
        finished: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPending({ ...newPending, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Realizar la solicitud para registrar la nueva actividad pendiente
        try {
            const formData = new FormData();
            formData.append('provider', newPending.provider);
            formData.append('description', newPending.description);
            formData.append('request_date', newPending.request_date);
            formData.append('status', newPending.status);
            formData.append('ticket_associated', newPending.ticket_associated);
            formData.append('finished', newPending.finished);

            const response = await actions.registerPendingActivityByProviders(newPending);

            // Verificar la respuesta del backend
            if (response.ok) {
                if (response.status === 201 || response.status === 200) {
                    toast.success("Actividad pendiente registrada");
                    console.log("Actividad pendiente añadida");

                    // Limpiar el formulario después de un registro exitoso
                    setNewPending({
                        provider: '',
                        description: '',
                        request_date: '',
                        status: '',
                        ticket_associated: '',
                        finished: false,
                    });
                }
            } else {
                // Mostrar mensaje de error si no hay una respuesta exitosa
                toast.error('Error ' + response.status + ': ' + response.statusText);
                console.log("Error del servidor:", response.statusText);
            }
        } catch (error) {
            console.error('Error al registrar la actividad pendiente:', error);
            if (error instanceof TypeError && error.message.includes('NetworkError')) {
                toast.error('Error de red al intentar comunicarse con el servidor');
            } else {
                toast.error('Error inesperado al registrar la actividad pendiente');
            }
        }
    };


    return (
        <>
            <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
            <div className="container">
                <div className="section-title mt-3">
                    <h2>Registro de Actividades Pendientes de Proveedores</h2>
                </div>
                <div className='row'>
                    <div className="col-lg-7 mx-auto ">
                        <form className="text-center" noValidate onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="provider">Proveedor</label>
                                <select
                                    className="form-select"
                                    id="provider"
                                    name="provider"
                                    required
                                    onChange={handleChange}
                                    value={newPending.provider}
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
                                    required
                                    value={newPending.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Fecha de Solicitud</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="request_date"
                                    required
                                    value={newPending.request_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Estatus</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="status"
                                    required
                                    value={newPending.status}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Ticket Asociado</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ticket_associated"
                                    value={newPending.ticket_associated}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="finished"
                                        checked={newPending.finished}
                                        onChange={(e) => setNewPending({ ...newPending, finished: e.target.checked })}
                                    />
                                    <label className="form-check-label" htmlFor="finished">Finalizado</label>
                                </div>
                            </div>
                            <button className='btn btn-primary' type="submit">Registrar Actividad Pendiente</button>
                        </form>
                    </div>
                    <div className="col-lg-12">
                        <PendingTablesProviders providers={providers}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PendingByProviders;