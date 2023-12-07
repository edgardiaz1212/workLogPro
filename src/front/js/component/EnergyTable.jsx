import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const EnergyTable = ({ selectedYear }) => {
    const { store, actions } = useContext(Context);
    const [activities, setActivities] = useState([]);
    const [selectedActivityForEvidence, setSelectedActivityForEvidence] = useState(null);
    const [selectedActivityForView, setSelectedActivityForView] = useState(null);

    useEffect(() => {
        // Llamar a la función de flux para obtener las actividades del año seleccionado
        if (selectedYear) {
            const fetchActivities = async () => {
                try {
                    const data = await actions.graphYear(selectedYear);
                    if (data.activities) {
                        setActivities(data.activities);
                    } else {
                        console.error("Error al obtener actividades:", data.error);
                    }
                } catch (error) {
                    console.error("Error al obtener actividades:", error);
                }
            };

            fetchActivities();
        }
    }, [selectedYear, actions]);

    const handleSubirEvidencia = (activity) => {
        // Lógica para subir evidencia, puedes abrir un modal o redirigir a una página de subir evidencia
        setSelectedActivityForEvidence(activity);
        // Aquí puedes realizar la acción correspondiente
    };

    const handleVer = (activity) => {
        // Lógica para ver detalles, puedes abrir un modal o redirigir a una página de detalles
        setSelectedActivityForView(activity);
        // Aquí puedes realizar la acción correspondiente
    };

    return (
        <div className="mt-5">
            <h2>Tabla de Mantenimientos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Actividad</th>
                        <th>Tipo de Mantenimiento</th>
                        <th>Técnico energía</th>
                        <th>Actividad satisfactoria</th>
                        <th>Acciones</th>
                        {/* Agrega más columnas según sea necesario */}
                    </tr>
                </thead>
                <tbody>
                    {activities.map((activity) => (
                        <tr key={activity.id}>
                            <td>{`${activity.year}-${activity.mes}-${activity.dia}`}</td>
                            <td>{activity.actividad}</td>
                            <td>{activity.tipo_de_mantenimiento}</td>
                            <td>{activity.tecnico_nombre_apellido}</td>
                            <td>{activity.actividad_satisfactoria ? 'Sí' : 'No'}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Acciones">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleSubirEvidencia(activity)}
                                    >
                                        Subir Evidencia
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => handleVer(activity)}
                                    >
                                        Ver
                                    </button>
                                </div>
                            </td>
                            {/* Agrega más celdas según sea necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnergyTable;