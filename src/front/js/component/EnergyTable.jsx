import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ModalEvidenceEnergy from "./ModalEvidenceEnergy.jsx";

const EnergyTable = ({ selectedYear }) => {
    const { store, actions } = useContext(Context);
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activitiesWithSameDate, setActivitiesWithSameDate] = useState([]);
    const [openModal, setOpenModal] = useState(false);

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

    const handleGeneratePlanilla = (activity) => {
        // Obtener actividades con la misma fecha
        const activitiesWithSameDate = activities.filter(
            (otherActivity) =>
                otherActivity.year === activity.year &&
                otherActivity.mes === activity.mes &&
                otherActivity.dia === activity.dia &&
                otherActivity.id !== activity.id
        );

        // Abrir el modal y pasar la actividad y las actividades con la misma fecha
        setSelectedActivity(activity);
        setActivitiesWithSameDate(activitiesWithSameDate);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedActivity(null);
        setActivitiesWithSameDate([]);
        setOpenModal(false);
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
                                    
                                    <ModalEvidenceEnergy
                                            selectedActivity={selectedActivity}
                                            activity={activity}
                                            handleGeneratePlanilla={handleGeneratePlanilla}
                                            activitiesWithSameDate={activitiesWithSameDate}
                                            onClose={handleCloseModal}
                                            onGenerate={() => {
                                                // Lógica para manejar la generación de planilla
                                                handleCloseModal();
                                            }}
                                        />
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => handleGeneratePlanilla(activity)}
                                    >
                                        Ver
                                    </button>
                                  
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnergyTable;