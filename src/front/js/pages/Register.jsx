import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  surname: "",
  email: "",
  emailDCH: "",
  unity:"",
  password: "",
  jobPosition: "",
  description: ""
};

function Register() {
  return (
    <>
      <div className="container ls mt-4 ">

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
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon6">Unidad</span>
          <input type="text" className="form-control" placeholder="Unidad" aria-label="unity" aria-describedby="basic-addon6" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon5">Cargo </span>

          <select
            className="form-select"
            aria-label="jobPosition"
            id="jobPosition"
            name="jobPosition"
          // onChange={handleChange}
          // value={newUser.contract}
          >
            <option value="">Seleccionar Cargo</option>
            <option value="Consultor">Consultor</option>
            <option value="Lider">Lider</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Descripcion</span>
          <textarea class="form-control" aria-label="description"></textarea>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon5">Contrasena</span>
          <input type="password" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon5" />
        </div>

        <Link to="/">
          <button className="btn btn-primary mt-3 mb-3">Guardar</button>
        </Link>
      </div>
    </>
  )
}

export default Register