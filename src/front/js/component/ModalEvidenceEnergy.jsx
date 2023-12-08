import React, { useState } from 'react';

function ModalEvidenceEnergy({ onClose, onGenerate }) {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activitiesWithSameDate, setActivitiesWithSameDate] = useState([]);

    const handleGenerate = () => {
        // Aquí puedes usar selectedActivity y activitiesWithSameDate según sea necesario
        onGenerate(selectedActivity, activitiesWithSameDate);
        onClose();
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Cargar Planilla
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
                                <label htmlFor="formFile" className="form-label">Ejemplo de entrada de archivo predeterminado</label>
                                <input className="form-control" type="file" id="formFile" />
                            </div>
                            {activitiesWithSameDate.length > 0 && (
                                <>
                                    <p>Registros con la misma fecha:</p>
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