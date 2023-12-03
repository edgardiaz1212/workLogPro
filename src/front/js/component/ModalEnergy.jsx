import React from 'react';

function ModalEnergy({ selectedActivities }) {
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Generar Planilla de Seleccionados
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Los elementos a generar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedActivities.length > 0 ? (
                                <ul>
                                    {selectedActivities.map((activity) => (
                                        <li key={activity.id}>{`${activity.year}-${activity.mes}-${activity.dia}, Actividad: ${activity.actividad}`}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No se han seleccionado actividades</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">Generar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEnergy;