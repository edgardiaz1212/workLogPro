import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css"

function PendingTablesProviders({ provider }) {
  const { actions } = useContext(Context);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        console.log(`Fetching descriptions for provider: ${provider}`);
        const response = await actions.getUnresolvedActivitiesByProvider(provider);

        if (response && response.unresolved) {
          const descriptions = response.unresolved.map((pending) => {
            return pending.description;
          });
          setDescriptions(descriptions);
        } else {
          console.error('Error al obtener pendientes por proveedor:', response);
        }
      } catch (error) {
        console.error('Error al obtener pendientes por proveedor:', error);
      }
    };

    fetchDescriptions();
  }, [provider, actions]);

  return (
    <div>
      
      {descriptions.map((description, index) => (
        <>
        
      <div className="card" key={index}>
        <div className="header">
          <span className="title">{provider}</span>

        </div>
        <ul className="lists">
          <li className="list">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>{description}</span>
          </li>

        </ul>
        <button type="button" className="action">Ver Todas</button>
      </div>
      </>
      ))}

    </div>
  );
}

export default PendingTablesProviders;