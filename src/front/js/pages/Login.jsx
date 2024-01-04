import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(initialState)
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { status, data } = await actions.loginUser(user);

      if (status=== 201 || status === 200) {
        toast.success(`¡Bienvenido, ${store.user.name}!`,{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
        
        setTimeout(() => {
          navigate("/")
        }, 2000)
      } else {
        toast.error(`Error de Inicio de sesión: ${data.message || "Error desconocido"}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error("Error en el inicio de sesión", status);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  const handleChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  // Manejar la tecla "Enter" para enviar el formulario
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div className="container m-5">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <form onKeyDown={handleKeyDown}>
              <div className="mb-3">
                <label htmlFor="formControlInput1" className="form-label">Correo Corportativo</label>
                <input type="email" className="form-control" id="formControlInput1" placeholder="alias@cantv.com.ve" onChange={handleChange} name="email"/>
              </div>

              <label htmlFor="inputPassword" className="form-label">Contraseña</label>
              <input type="password" id="inputPassword" className="form-control" aria-describedby="passwordHelpBlock" onChange={handleChange} name="password" />

              <button type="button" className="btn btn-primary mt-3" onClick={() => handleLogin()}>Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
