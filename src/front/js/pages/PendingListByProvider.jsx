import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css"

const PendingListByProvider = () => {
  const { actions } = useContext(Context);
  const [activities, setActivities] = useState([]);
  const { provider } = useParams();
  const navigate  = useNavigate()

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

  return (
    <>
      <div className='container'>
        <div className="section-title mt-3">
          <h2>Actividades pendientes de {provider}</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{activity.id}</td>
                <td>{activity.description}</td>
                <td>{activity.request_date}</td>
                <td>{activity.status}</td>
                <td>{activity.ticket_associated}</td>
                <td>{activity.finished}</td>
                <td>
                  <>
                  <button>Editar</button>
                  <button>Eliminar</button>
                  </>
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