import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import TenTemperature from '../component/TenTemperatures.jsx'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TemperatureRegistry = () => {
    const { store, actions } = useContext(Context);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedAir, setSelectedAir] = useState('');
    const [temperatureValue, setTemperatureValue] = useState('');

    // Estado para la señal de actualización
    const [updateSignal, setUpdateSignal] = useState(false);

    const handleRegisterTemperature = async () => {
        if (!selectedDate || !selectedHour || !selectedAir || !temperatureValue) {
            console.log("Por favor completa todos los campos");
            toast.error("Faltan campos por llenar");
            return;
        }
    
        try {
            const result = await actions.addTemperature({
                air_unit: selectedAir,
                temperature: temperatureValue,
                measurement_time: selectedHour,
                measurement_date: selectedDate
            });
    
            if (result.success) {
                // Restablecer los valores a sus estados iniciales
                setSelectedDate('');
                setSelectedHour('');
                setSelectedAir('');
                setTemperatureValue('');
                // Cambiar la señal de actualización
                setUpdateSignal(!updateSignal);
            } else {
                console.error("Error en la solicitud de registro:", result.error);
                toast.error("Error al registrar la temperatura");
            }
        } catch (error) {
            console.error("Error en la solicitud de registro:", error);
            toast.error("Error al registrar la temperatura");
        }
    };

    useEffect(() => {
        // Puedes realizar alguna lógica adicional cuando cambie la fecha, la hora o el aire seleccionados
    }, [selectedDate, selectedHour, selectedAir]);

    return (
        <>
            <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
            <div className="container mt-5 p-5 ">
                <div className="section-title mt-3">
                    <h2>Registro de Temperaturas</h2>
                </div>
                <div className='row gy-2 gx-3 align-items-center'>
                    <div className="input-group mb-3 col-4" >
                        <label htmlFor="datePicker" className="input-group-text">Fecha</label>
                        {/* Componente de selección de fecha */}
                        {/* Asegúrate de manejar el estado de la fecha */}
                        <input
                            type="date"
                            id="datePicker"
                            className="form-control"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="hourSelect" className="input-group-text">Hora</label>
                        {/* Componente de selección de hora */}
                        {/* Asegúrate de manejar el estado de la hora */}
                        <select
                            id="hourSelect"
                            className="form-select"
                            value={selectedHour}
                            onChange={(e) => setSelectedHour(e.target.value)}
                        >
                            {/* Opciones de horas preestablecidas */}
                            <option >Seleccione una opcion</option>
                            <option value="2am">2am</option>
                            <option value="6am">6am</option>
                            <option value="9am">9am</option>
                            <option value="12pm">12pm</option>
                            <option value="3pm">3pm</option>
                            <option value="6pm">6pm</option>
                            <option value="10pm">10pm</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="airSelect" className="input-group-text">Aire Acondicionado</label>
                        {/* Componente de selección de aire acondicionado */}
                        {/* Asegúrate de manejar el estado del aire acondicionado */}
                        <select
                            id="airSelect"
                            className="form-select"
                            value={selectedAir}
                            onChange={(e) => setSelectedAir(e.target.value)}
                        >
                            {/* Opciones de aires acondicionados preestablecidos */}
                            <option >Seleccione un aire</option>
                            <option value="Aire1">Aire 1</option>
                            <option value="Aire2">Aire 2</option>
                            <option value="Aire3">Aire 3</option>
                            <option value="Aire4">Aire 4</option>
                            <option value="Aire5">Aire 5</option>
                            <option value="Aire6">Aire 6</option>
                            <option value="Aire7">Aire 7</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="temperatureInput" className="input-group-text">Temperatura</label>
                        <input
                            type="text"
                            id="temperatureInput"
                            className="form-control"
                            value={temperatureValue}
                            onChange={(e) => setTemperatureValue(e.target.value)}
                        />
                    </div></div>
                <button className="btn btn-primary" onClick={handleRegisterTemperature}>Registrar Temperatura</button>
                <Link to="/temp-graphic" className='btn btn-secondary ms-3'> Ver Graficas</Link>

            </div>
            <TenTemperature updateSignal={updateSignal} />
        </>
    );
};

export default TemperatureRegistry;
