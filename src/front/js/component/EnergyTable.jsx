
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

    return (
        <div className="mt-5">
            <h2>Tabla de Actividades</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Actividad</th>
                        <th>Tipo de Mantenimiento</th>
                        <th>Técnico energía</th>
                        <th>Actividad satisfactoria</th>
                        <th>Seleccion</th>
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
                            <td>{activity.actividad_satisfactoria}</td>
                            <td><div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />

                            </div></td>
                            {/* Agrega más celdas según sea necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary">Crear planilla de seleccionados</button>

        </div>
    );
};

export default EnergyTable;
