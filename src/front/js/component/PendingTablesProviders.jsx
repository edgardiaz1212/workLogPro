import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';

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
            console.log(`Description for ${provider}: ${pending.description}`);
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
      <h3>Proveedor: {provider}</h3>
      {descriptions.map((description, index) => (
        <div key={index}>
          {/* Mostrar información de la descripción */}
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default PendingTablesProviders;