import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

function Login() {
    const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const status = await actions.loginUser(email, password);

    if (status === 200) {
      // Hacer algo después del inicio de sesión exitoso, por ejemplo, redirigir a otra página
    } else {
      // Manejar errores o mostrar mensajes de error
      console.error("Error en el inicio de sesión");
    }
  };
    return (
        <>
            <div className="container m-5">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <div className=" mb-3 ">
                            <label htmlForfor="exampleFormControlInput1" className="form-label">Correo</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"  onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <label for="inputPassword5" className="form-label">Password</label>
                        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)}/>
                        {/* <div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div> */}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleLogin}>Entrar</button>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Login