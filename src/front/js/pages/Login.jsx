import React from "react";

function Login() {
    return (
        <>
            <div className="container m-5">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <div className=" mb-3 ">
                            <label htmlForfor="exampleFormControlInput1" className="form-label">Correo</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>

                        <label for="inputPassword5" className="form-label">Password</label>
                        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                        {/* <div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div> */}
                        <button type="button" className="btn btn-primary mt-3">Entrar</button>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Login