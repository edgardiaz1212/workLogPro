import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'

function PendingTablesProviders() {
    const { actions } = useContext(Context)
    return (
    <>
    <div>
      hola
      
    </div>
    </>
  )
}

export default PendingTablesProviders