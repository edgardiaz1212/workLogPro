import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import TenTemperature from '../component/TenTemperatures.jsx'

const TemperatureRegistry = () => {
    const { store, actions } = useContext(Context);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedAir, setSelectedAir] = useState('');
    const [temperatureValue, setTemperatureValue] = useState('');

    const handleRegisterTemperature = () => {
        // Aquí puedes llamar a la función del flujo para agregar la temperatura
        const temperatureData = {
            air_unit: selectedAir,
            temperature: temperatureValue,
            measurement_time: selectedHour,
            measurement_date: selectedDate
        };

        actions.addTemperature(temperatureData);
    };

    useEffect(() => {
        // Puedes realizar alguna lógica adicional cuando cambie la fecha, la hora o el aire seleccionados
    }, [selectedDate, selectedHour, selectedAir]);

    return (
      <>
        <div className="container mt-5">
            <h2>Registro de Temperaturas</h2>
            <div className="mb-3">
                <label htmlFor="datePicker" className="form-label">Fecha</label>
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
            <div className="mb-3">
                <label htmlFor="hourSelect" className="form-label">Hora</label>
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
                    <option value="9pm">10pm</option>
                    
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="airSelect" className="form-label">Aire Acondicionado</label>
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
            <div className="mb-3">
                <label htmlFor="temperatureInput" className="form-label">Temperatura</label>
                <input
                    type="text"
                    id="temperatureInput"
                    className="form-control"
                    value={temperatureValue}
                    onChange={(e) => setTemperatureValue(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleRegisterTemperature}>Registrar Temperatura</button>
        </div>
        <TenTemperature/>
        </>
    );
};

export default TemperatureRegistry;