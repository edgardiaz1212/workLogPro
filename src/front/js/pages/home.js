import React, { useContext } from "react";
import { Context } from "../store/appContext";
import baseImage from "../../img/hero-img.png";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		{/* <div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			
		</div> */}
		
  <section id="hero" className="d-flex align-items-center">

    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <h1>Infraestructura DCCE</h1>
          <h2>Varias soluciones un solo lugar</h2>
          <div className="d-flex justify-content-center justify-content-lg-start">
            <a href="#about" className="btn-get-started scrollto">Comencemos</a>
            
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
          <img src={baseImage} className="img-fluid animated" alt=""/>
        </div>
      </div>
    </div>

  </section>
  
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Infraestructura DCCE</h2>
        </div>

        <div className="row content">
          <div className="col-lg-6">
            <p>
              Somos parte de la familia Data Center el Hatillo, garantes de que se cumplan las normativas y continuar la labor de la mejora continua
            </p>
            <ul>
              <li><i className="ri-check-double-line"></i> Comunicacion constante con proveedores internos para asegurar la Infraestructura</li>
              <li><i className="ri-check-double-line"></i> Verificacion de cumplimiento de acuerdos con los diversos proveedores</li>
              <li><i className="ri-check-double-line"></i> Grupo integral para dar soluciones acertadas</li>
            </ul>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
          </div>
        </div>

      </div>
    </section>
    
    
    </>
	);
};
