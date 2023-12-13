import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const TenTemperature = ({ updateSignal }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Llamamos a la función del flujo para obtener las últimas 10 temperaturas
        actions.getLatestTenTemperatures();
    }, [updateSignal]); // La dependencia es una matriz vacía, se ejecuta solo al montar el componente

    const handleDeleteTemperature = (temperatureId) => {
        // Aquí puedes llamar a la función del flujo para eliminar la temperatura por su ID
        actions.deleteTemperature(temperatureId);
        actions.getLatestTenTemperatures()
    };
    return (
        <div className="container mt-5">
            <h2>Últimos 10 Registros de Temperaturas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Aire Acondicionado</th>
                        <th>Temperatura</th>
                    </tr>
                </thead>
                <tbody>
                    {store.tenTemperatures.map((temperature) => (
                        <tr key={temperature.id}>
                            <td>{temperature.measurement_date}</td>
                            <td>{temperature.measurement_time}</td>
                            <td>{temperature.air_unit}</td>
                            <td>{temperature.temperature}</td>
                            <td>
                            <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteTemperature(temperature.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TenTemperature;