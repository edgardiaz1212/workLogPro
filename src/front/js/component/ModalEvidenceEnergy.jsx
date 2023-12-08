// ModalEvidenceEnergy.jsx
import React, { useState ,useContext } from 'react';
import { Context } from "../store/appContext";


function ModalEvidenceEnergy({ selectedActivity, activitiesWithSameDate, onClose, onGenerate, handleGeneratePlanilla, activity }) {

    const [file, setFile] = useState(null);
    const { actions } = useContext(Context);
    const handleGenerate = async () => {
        // Aquí puedes usar selectedActivity y activitiesWithSameDate según sea necesario
        // Asegúrate de que formData incluya el archivo y otros datos necesarios
        const formData = new FormData();
        formData.append("evidence_file", file);  // Asegúrate de tener la referencia correcta al archivo
       

        // Llama a la acción para agregar la evidencia
        const response = await actions.addMaintenanceEvidence(selectedActivity.id, formData);

        if (response !== 500) {
            // Lógica para manejar la respuesta si es necesario
            console.log("Evidencia de mantenimiento agregada exitosamente:", response);
            onClose();  // Cierra el modal
        } else {
            // Lógica para manejar el error
            console.error("Error al agregar evidencia de mantenimiento");
        }
        onGenerate();
        onClose();
    };

    return (
        <>
            <button type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleGeneratePlanilla(activity)}>
                Cargar Planilla1
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Evidencia para la fecha {`${selectedActivity?.year}-${selectedActivity?.mes}-${selectedActivity?.dia}`}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Fecha y mantenimiento del elemento seleccionado: {`${selectedActivity?.year}-${selectedActivity?.mes}-${selectedActivity?.dia}`} - {selectedActivity?.actividad}</p>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Anexar planilla</label>
                                <input className="form-control" type="file" id="formFile" />
                            </div>
                            {activitiesWithSameDate.length > 0 && (
                                <>
                                    <p>Anadir registros con la misma fecha:</p>
                                    <ul className="list-group">
                                        {activitiesWithSameDate.map((otherActivity) => (
                                            <li key={otherActivity.id} className="list-group-item">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`flexCheckDefault_${otherActivity.id}`}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`flexCheckDefault_${otherActivity.id}`}
                                                    >
                                                        {`${otherActivity.year}-${otherActivity.mes}-${otherActivity.dia}`} - {otherActivity.actividad}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleGenerate}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEvidenceEnergy;
