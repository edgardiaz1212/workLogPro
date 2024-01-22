import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css"

function PendingTablesProviders({ provider, setProviders, setActivities }) {
  const { actions } = useContext(Context);
  const [activities, setLocalActivities] = useState([]);
  // const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log(`Fetching activities for provider: ${provider}`);
        const response = await actions.getLast10UnresolvedActivitiesByProvider(provider);

        if (response && response.unresolved) {
          setLocalActivities(response.unresolved);
        } else {
          console.error('Error al obtener pendientes por proveedor:', response);
        }
      } catch (error) {
        console.error('Error al obtener pendientes por proveedor:', error);
      }
    };

    fetchActivities();
  }, [provider, actions]);

  // const handleVerTodas = async () => {
  //   try {
  //     const response = await actions.getUnresolvedActivitiesByProvider(provider);
  //     if (response && response.unresolved) {
  //       setLocalActivities(response.unresolved);
  //       setShowAll(true);
  //     } else {
  //       console.error('Error al obtener todas las actividades por proveedor:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error al obtener todas las actividades por proveedor:', error);
  //   }
  // };

  const handleAddActivity = async () => {
    try {
      // Lógica para agregar una nueva actividad, similar a la obtención de actividades
      const response = await actions.getLast10UnresolvedActivitiesByProvider(provider);
      if (response && response.unresolved) {
        setLocalActivities(response.unresolved);
        // También puedes agregar lógica adicional para cerrar el formulario, etc.
      } else {
        console.error('Error al agregar nueva actividad:', response);
      }
    } catch (error) {
      console.error('Error al agregar nueva actividad:', error);
    }
  };

  return (
    <div>
      <div className="card" key={provider}>
        <div className="header">
          <span className="title">{provider}</span>
        </div>
        <ul className="lists">
          {activities.map((pending, index) => (
            <li className="list" key={index}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>{pending.description}</span>
            </li>
          ))}
        </ul>
        {/* {!showAll && (
          <>
            <button type="button" className="action" onClick={handleAddActivity}>
              Agregar Nueva Actividad
            </button>
            <button type="button" className="action" onClick={handleVerTodas}>
              Ver Todas
            </button>
          </>
        )} */}
      </div>
    </div>
  );
}

export default PendingTablesProviders;