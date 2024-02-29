import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css";

const PendingListByProvider = () => {
  const { actions } = useContext(Context);
  const [activities, setActivities] = useState([]);
  const [editableActivityIndex, setEditableActivityIndex] = useState(null);
  const [editedActivity, setEditedActivity] = useState(null);
  const { provider } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log(`Fetching activities for provider: ${provider}`);
        const response = await actions.getUnresolvedActivitiesByProvider(provider);

        if (response && response.unresolved) {
          setActivities(response.unresolved);
        } else {
          console.error('Error al obtener actividades por proveedor:', response);
        }
      } catch (error) {
        console.error('Error al obtener actividades por proveedor:', error);
      }
    };

    fetchActivities();
  }, [provider, actions]);

  const goBack = () => {
    navigate(-1);
  };

  const handleEditClick = (index) => {
    setEditableActivityIndex(index);
    // Al hacer clic en editar, clonamos la actividad seleccionada para editarla
    setEditedActivity({ ...activities[index] });
  };

  const handleCancelEdit = () => {
    setEditableActivityIndex(null);
    setEditedActivity(null);
  };

  const handleSaveEdit = async () => {
    try {
      // Create a copy of the edited activity
      const updatedActivity = { ...activities[editableActivityIndex] };
  
      // Update the copy with the new values from the form
      updatedActivity.description = editedActivity.description;
      updatedActivity.request_date = editedActivity.request_date;
      updatedActivity.status = editedActivity.status;
      updatedActivity.ticket_associated = editedActivity.ticket_associated;
  
      // Send the updated activity to the server
      const response = await actions.editPendingActivityProvider(updatedActivity);
  
      if (response) {
        console.log('Activity updated successfully:', response);
  
        // Update the state with the actual updated activity from the server response
        const updatedActivities = [...activities];
        updatedActivities[editableActivityIndex] = response.data; // Assuming the response object has a "data" property containing the updated activity
        setActivities(updatedActivities);
  
        // Reset the editing state
        setEditableActivityIndex(null);
        setEditedActivity(null);
      } else {
        console.error('Error updating activity:', response);
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className="section-title mt-3">
          <h2>Actividades pendientes de {provider}</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Descripción</th>
              <th>Fecha de Solicitud</th>
              <th>Estatus</th>
              <th>Ticket Asociado</th>
              <th>Finalizado</th>
              <th>Mas acciones</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                {/* <td>{activity.id}</td> */}
                <td>{editableActivityIndex === index ? (
                  <input
                    type="text"
                    value={activity.description}
                    onChange={(e) => {
                      e.persist();
                      setActivities((prev) => {
                        const updatedActivities = [...prev];
                        updatedActivities[index].description = e.target.value;
                        return updatedActivities;
                      });
                    }}
                  />
                ) : (
                  activity.description
                )}</td>
                <td>{editableActivityIndex === index ? (
                  <input
                    type="date"
                    value={activity.request_date}
                    onChange={(e) => {
                      e.persist()
                      setActivities((prev) => {
                        const updatedActivities = [...prev];
                        updatedActivities[index].request_date = e.target.value;
                        return updatedActivities;
                      })
                    }}
                  />
                ) : (
                  activity.request_date
                )} </td>
                <td>
                  {editableActivityIndex === index ? (
                    <select
                      type="text"
                      value={activity.status}
                      onChange={(e) => {
                        e.persist()
                        setActivities((prev) => {
                          const updatedActivities = [...prev];
                          updatedActivities[index].status = e.target.value;
                          return updatedActivities;
                        })
                      }}
                    >
                      <option value="pendiente"> Pendiente</option>
                      <option value="ejecucion">En Ejecucion</option>
                    </select>

                  ) : (
                    activity.status
                  )}
                </td>
                <td>
                  {editableActivityIndex === index ? (
                    <input
                      type="text"
                      value={activity.ticket_associated}
                      onChange={(e) => {
                        e.persist()
                        setActivities((prev) => {
                          const updatedActivities = [...prev];
                          updatedActivities[index].ticket_associated = e.target.value;
                          return updatedActivities;
                        })
                      }}
                    />
                  ) : (
                    activity.ticket_associated
                  )}
                </td>
                <td>
                  {editableActivityIndex === index ? (
                    <input
                      type="text"
                      checked={activity.id}
                      onChange={(e) => {
                        e.persist()
                        setActivities((prev) => {
                          const updatedActivities = [...prev];
                          updatedActivities[index].id = e.target.value;
                          return updatedActivities;
                        })
                      }}
                    />
                  ) : (
                    activity.id.toString()
                  )}
                </td>
                <td>
                  {editableActivityIndex === index ? (
                    <>
                      <button onClick={() => handleSaveEdit(activity)}>Guardar</button>
                      <button onClick={handleCancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(index)}>Editar</button>
                      <button onClick={() => handleDeleteClick(activity.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-secondary ms-3" onClick={goBack}>
          Volver
        </button>
      </div>
    </>
  );
};

export default PendingListByProvider;