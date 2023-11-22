import React from 'react'
import { Link } from 'react-router-dom'
function Register() {
  return (
    <>
      <div className="container ls">
        <p>nombre , apellido, unidad, correo, correo alternativo, Puesto, descripcion</p>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre </span>
          <input type="text" className="form-control" placeholder="Nombre" aria-label="name" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Apellido </span>
          <input type="text" className="form-control" placeholder="Apellido" aria-label="surname" aria-describedby="basic-addon2" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">Correo Corporativo</span>
          <input type="text" className="form-control" placeholder="@cantv.com.ve" aria-label="email" aria-describedby="basic-addon3" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon4">Correo DCH </span>
          <input type="text" className="form-control" placeholder="@dch.cantv.com.ve" aria-label="email2" aria-describedby="basic-addon4" />
        </div>


        <Link to="/">
          <button className="btn btn-primary">Back home</button>
        </Link>
      </div>
    </>
  )
}

export default Register