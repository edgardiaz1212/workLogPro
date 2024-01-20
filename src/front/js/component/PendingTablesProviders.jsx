import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/pendingCard.css"

function PendingTablesProviders({ provider }) {
  const { store, actions } = useContext(Context);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        console.log(`Fetching descriptions for provider: ${provider}`);

         const response = await actions.getPendingActivitiesByProvider(provider);

        if (response && response.pendings) {
          const descriptions = response.pendings.map((pending) => {
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
  }, [provider]);

  return (

    <h1>Tabla</h1>
    // <div>
    //    <div>
    //             <h3>Proveedor: {provider}</h3>
    //             {activities.map(activity => (
    //                 <div key={activity.id}>
    //                     {/* Mostrar información de la actividad */}
    //                     <p>{activity.description}</p>
    //                     {/* ...otra información de la actividad */}
    //                 </div>
    //             ))}
    //         </div>

    //   {providers.map((provider) => (
    //   <div className="card" key={provider}>
    //     <div className="header">
    //       <span className="title">{provider}</span>
    //     </div>

    //     <ul className="lists">
    //       <li className="list">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <span>Descripcion</span>
    //       </li>
    //     </ul>
    //     <button type="button" className="action">
    //       Ver todas
    //     </button>
    //   </div>
    //   ))}

    // </div>
  );
}

export default PendingTablesProviders;