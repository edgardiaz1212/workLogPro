import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ModalEnergy from "./ModalEnergy.jsx";

const EnergyTable = ({ selectedYear }) => {
    const { store, actions } = useContext(Context);
    const [activities, setActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);

    useEffect(() => {
        // Llamar a la función de flux para obtener las actividades del año seleccionado
        if (selectedYear) {
            const fetchActivities = async () => {
                try {
                    const data = await actions.graphYear(selectedYear);
                    if (data.activities) {
                        setActivities(data.activities);
                        console.log(data.activities)
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

    const handleCheckboxChange = (activity) => {
        const isSelected = selectedActivities.some((selected) => selected.id === activity.id);

        if (isSelected) {
            setSelectedActivities((prevSelected) => prevSelected.filter((selected) => selected.id !== activity.id));
        } else {
            setSelectedActivities((prevSelected) => [...prevSelected, activity]);
        }
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
                            <td>{activity.actividad_satisfactoria ? 'Sí' : 'No'}</td>
                            <td>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(activity)}
                                        checked={selectedActivities.some((selected) => selected.id === activity.id)}
                                    />
                                </div>
                            </td>
                            {/* Agrega más celdas según sea necesario */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalEnergy selectedActivities={selectedActivities} />
        </div>
    );
};

export default EnergyTable;
