import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const TenTemperature = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Llamamos a la función del flujo para obtener todos los registros de temperaturas
        actions.getAllTemperatures();
    }, [actions]);

    // Filtramos para obtener solo los últimos 10 registros
    const lastTenTemperatures = store.allTemperatures.slice(-10);

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
                    {lastTenTemperatures.map((temperature) => (
                        <tr key={temperature.id}>
                            <td>{temperature.date}</td>
                            <td>{temperature.hour}</td>
                            <td>{temperature.air}</td>
                            <td>{temperature.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TenTemperature;