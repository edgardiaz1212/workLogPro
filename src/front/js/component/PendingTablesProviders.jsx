import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css"

function PendingTablesProviders({ provider, forceUpdate }) {
  const { actions } = useContext(Context);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log(`Fetching activities for provider: ${provider}`);
        const response = await actions.getLast10UnresolvedActivitiesByProvider(provider);

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
  }, [provider, actions, forceUpdate]);

  return (
    <div >
      <div className="card">
        <div className="header">
          
          <span className="title" >{provider === 'energia' ? 'Energía Operaciones y Mantenimiento' :
            provider === 'infraestructura' ? 'Infraestructura' :
              provider === 'servicios-logistica' ? 'Servicios y Logística' :
                provider === 'seguridad-fisica' ? 'Seguridad Física' : 
          provider === 'proteccion-digital' ? 'Protección  Digital' : 'Seguridad e Higiene Industrial'}
          </span>
        </div>
        <ul className="lists">
          {activities.map((activity, index) => (
            <li className="list" key={index}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>{activity.description}</span>
              
            </li>
          ))}
        </ul>
        <Link to={`/pending-list-by-provider/${provider}`} className='btn btn-secondary'>Ver todas</Link>
      </div>
    </div>
  );
}

export default PendingTablesProviders;