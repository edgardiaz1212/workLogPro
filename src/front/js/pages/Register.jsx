import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  surname: "",
  email: "",
  emailDCH: "",
  unit: "",
  password: "",
  jobPosition: "",
  description: ""
};

function Register() {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(initialState);

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };
 
  const handleSignup = async () => {
    if (!user.name || !user.surname || !user.password || !user.emailDCH) {
      console.log("Por favor completa todos los campos");
      toast.error("Faltan campos por llenar")
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("surname", user.surname);
      formData.append("email", user.email);
      formData.append("emailDCH", user.emailDCH);
      formData.append("unit", user.unit);
      formData.append("password", user.password)
      formData.append("jobPosition", user.jobPosition)
      formData.append("description", user.description)

      const response = await actions.registerUser(formData);

      if (response === 201 || 200) {
        toast.success("Registro Exitoso")
        console.log("Registro exitoso")
        //retrasa el cambio a home por 2 segundos
        setTimeout(() => {
          navigate("/")
        }, 2000)

      } else {
        toast.error("Error registrando")

        console.log("Error en el registro")
      }
    } catch (error) {
      console.log("Error en la solicitud de registro:", error)
    }
  };

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div className="section-title mt-3">
                <h2>Registro Nuevo Personal</h2>
            </div>
      <div className="container ls mt-4 ">
        <form >
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre </span>
            <input type="text" className="form-control" placeholder="Nombre" aria-label="name"
              aria-describedby="basic-addon1"
              name="name"
              value={user.name}
              onChange={handleChange} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">Apellido </span>
            <input type="text" className="form-control" placeholder="Apellido" aria-label="surname"
              aria-describedby="basic-addon2"
              name="surname"
              value={user.surname}
              onChange={handleChange} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">Correo Corporativo</span>
            <input type="text" className="form-control" placeholder="@cantv.com.ve" aria-label="email"
              aria-describedby="basic-addon3"
              name="email"
              value={user.email}
              onChange={handleChange} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">Correo DCH </span>
            <input type="text" className="form-control" placeholder="@dch.cantv.com.ve" aria-label="emaildch"
              aria-describedby="basic-addon4"
              name="emailDCH"
              value={user.emailDCH}
              onChange={handleChange} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon6">Unidad </span>

            <select
              className="form-select"
              aria-label="unit"
              id="unit"
              name="unit"
              onChange={handleChange}
              value={user.unit}
            >
              <option value="">Seleccionar Cargo</option>
              <option value="Infraestructura">Infraestructura</option>
              <option value="Operaciones">Operaciones</option>
              <option value="Gerencia">Gerencia</option>
            </select>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon6">Cargo </span>

            <select
              className="form-select"
              aria-label="jobPosition"
              id="jobPosition"
              name="jobPosition"
              onChange={handleChange}
              value={user.jobPosition}
            >
              <option value="">Seleccionar Cargo</option>
              <option value="Consultor">Consultor</option>
              <option value="Lider">Lider</option>
              <option value="Gerente">Gerente</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Descripcion</span>
            <textarea className="form-control" aria-label="description"
              name="description"
              onChange={handleChange}
              value={user.description}>
            </textarea>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon5">Contrasena</span>
            <input type="password" className="form-control" placeholder="password" aria-label="password" 
            aria-describedby="basic-addon7"
            name="password"
            value={user.password}
            onChange={handleChange} />
          </div>

          <Link to="/">
            <button className="btn btn-primary mt-3 mb-3" onClick={handleSignup}>Guardar</button>
          </Link>
        </form>
      </div>
    </>
  )
}

export default Register