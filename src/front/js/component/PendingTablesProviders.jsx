import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'

function PendingTablesProviders({ pendingTables }) {
    const { actions } = useContext(Context)
    return (
    <>
    <div>
      hola
      {/* {Object.entries(pendingTables).map(([provider, activities]) =>(
        <div key={provider} className="card mb-3">
          <div className="card-header">Proveedor: {provider}</div>
          <div className="card-body">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Fecha de Solicitud</th>
                  <th>Estatus</th>
                  <th>Ticket Asociado</th>
                  <th>Finalizado</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) =>(
                  <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td>{activity.description}</td>
                    <td>{activity.request_date}</td>
                    <td>{activity.status}</td>
                    <td>{activity.ticket_associated}</td>
                    <td>{activity.finished ? 'Sí' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))} */}
    </div>
    </>
  )
}

export default PendingTablesProviders