import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css"

const PendingListByProvider = () => {
  const { actions } = useContext(Context);
  const [activities, setActivities] = useState([]);
  const { provider } = useParams();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log(`Fetching activities for provider: ${provider}`);
        const response = await actions.getAllUnresolvedActivitiesByProvider(provider);

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

  return (
    <div>
      <h1>Actividades pendientes de {provider}</h1>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default PendingListByProvider