import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css";

const PendingListByProvider = () => {
  const { actions } = useContext(Context);
  const [activities, setActivities] = useState([]);
  const [editableActivity, setEditableActivity] = useState(null);
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
    setEditableActivity(index);
  };

  const handleCancelEdit = () => {
    setEditableActivity(null);
  };

  const handleSaveEdit = async (activity) => {
    try {
      const response = await actions.editPendingActivityProvider(activity);
      if (response) {
        console.log('Activity updated successfully:', response);
        setEditableActivity(null);
      } else {
        console.error('Error updating activity:', response);
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleDeleteClick = async (activityId) => {
    try {
      const response = await actions.deletePendingActivityProvider(activityId);

      if (!response) {
        console.error('Error deleting activity: Empty response');
        return;
      }

      if (response.ok) {
        console.log('Activity deleted successfully');
        // Update the state immediately
        setActivities((prev) => prev.filter((activity) => activity.id !== activityId));
      } else {
        console.error('Error deleting activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
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
                <td>{editableActivity === index ? (
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
                <td>{editableActivity === index ? (
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
                  {editableActivity === index ? (
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
                  {editableActivity === index ? (
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
                  {editableActivity === index ? (
                    <input
                      type="checkbox"
                      checked={activity.finished}
                      onChange={(e) => {
                        e.persist()
                        setActivities((prev) => {
                          const updatedActivities = [...prev];
                          updatedActivities[index].finished = e.target.checked;
                          return updatedActivities;
                        })
                      }}
                    />
                  ) : (
                    activity.finished.toString()
                  )}
                </td>
                <td>
                  {editableActivity === index ? (
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