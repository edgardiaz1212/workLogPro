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
  const { actions } = useContext(Context);
  const [user, setUser] = useState(initialState)
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { status, data } = await actions.loginUser(user);

      if (status=== 201 || status === 200) {
        toast.success(`¡Bienvenido, ${actions.store.user.name}!`,{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
        console.log("Registro exitoso")
        setTimeout(() => {
          navigate("/")
        }, 2000)
      } else {
        toast.error(`Error de Inicio de sesión: ${data.message}`, {
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

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div className="container m-5">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <div className=" mb-3 ">
              <label htmlFor="formControlInput1" className="form-label">Correo</label>
              <input type="email" className="form-control" id="formControlInput1" placeholder="name@example.com" onChange={handleChange} name="email"/>
            </div>

            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" id="inputPassword" className="form-control" aria-describedby="passwordHelpBlock" onChange={handleChange} name="password" />
            {/* <div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div> */}
            <button type="button" className="btn btn-primary mt-3"  onClick={() => handleLogin()}>Entrar</button>

          </div>
        </div>
      </div>
    </>
  )
}
export default Login