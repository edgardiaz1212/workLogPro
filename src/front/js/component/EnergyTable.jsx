import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const EnergyTable = ({ selectedYear }) => {
    const { store, actions } = useContext(Context);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Llamar a la función de flux para obtener las actividades del año seleccionado
        if (selectedYear) {
            const fetchActivities = async () => {
                try {
                    const data = await actions.graphYear(selectedYear);
                    if (data.activities) {
                        setActivities(data.activities);
                        console.log(data.activities);
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

    const renderButtonRowSpan = (month) => {
        const activitiesForMonth = activities.filter((activity) => activity.mes === month);
        const rowspan = activitiesForMonth.length;

        if (rowspan > 0) {
            return (
                <td rowSpan={rowspan}>
                    <button className="btn btn-primary" onClick={() => handleVerPlanilla(month)}>
                        Ver Planilla del Mes {month}
                    </button>
                </td>
            );
        }

        return null;
    };

    const handleVerPlanilla = (month) => {
        // Lógica para redireccionar o mostrar la planilla del mes
        console.log(`Ver Planilla del Mes ${month}`);
    };

    return (
        <div className="mt-5">
            <h2>Tabla de Actividades</h2>
            <table className="table">
                <thead>
                    <tr><th>Mes</th>
                        <th>Fecha</th>
                        <th>Actividad</th>
                        <th>Tipo de Mantenimiento</th>
                        <th>Técnico energía</th>
                        <th>Actividad satisfactoria</th>
                        
                        {/* Agrega más columnas según sea necesario */}
                    </tr>
                </thead>
                <tbody>
                    {activities.map((activity, index) => (
                        <tr key={activity.id}>
                            {index === 0 && renderButtonRowSpan(activity.mes)}
                            <td>{`${activity.year}-${activity.mes}-${activity.dia}`}</td>
                            <td>{activity.actividad}</td>
                            <td>{activity.tipo_de_mantenimiento}</td>
                            <td>{activity.tecnico_nombre_apellido}</td>
                            <td>{activity.actividad_satisfactoria}</td>
                            {/* Agrega más celdas según sea necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnergyTable;
