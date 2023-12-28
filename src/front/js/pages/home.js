import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import baseImage from "../../img/hero-img.png";
import "../../styles/home.css";
import { Link } from 'react-router-dom';

export const Home = () => {
  const { store, actions } = useContext(Context);
  const {processedData} = store
  console.log(processedData)
  
  useEffect(() => {
    // Llama a la acción getUsersInfraestructura cuando el componente se monta
    actions.getUsersInfraestructura();
  }, [])
  
  return (
    <>

      <section id="hero" className="d-flex align-items-center">

        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1>Infraestructura DCCE</h1>
              <h2>Varias soluciones un solo lugar</h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                {/* <a href="#about" className="btn-get-started scrollto">Comencemos</a> */}

              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src={baseImage} className="img-fluid animated" alt="" />
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
                <li><i className="ri-check-double-line"></i> Grupo multidiciplinario para dar soluciones acertadas</li>
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
      <section id="cta" className="cta">
        <div className="container" data-aos="zoom-in">

          <div className="row">
            <div className="col-lg-9 text-center text-lg-start">
              <h3>Ayudante de Llenado</h3>
              <p> Para servicios de colocacion podras utilizar nuestro ayudante de llenado de la planilla FOR-BA7D para Instalaciones, Mudanza interna o Retiro de equipamiento de nuestros clientes.
              </p><p>Recuerda que la formalidad de las solicitudes se realizan por el correo requerimientosdcce@dch.cantv.com.ve</p>
            </div>
            <div className="col-lg-3 cta-btn-container text-center">
              <a className="cta-btn align-middle" href="#">Comenzar</a>
              {/* aca enlace para el movement colocacion */}
            </div>
          </div>

        </div>
      </section>

      <section id="team" className="team section-bg">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Equipo</h2>
            <p>Presentamos el equipo que compone la unidad de Infraestructura DCH</p>
          </div>

          <div className="row">
  {processedData
    .filter(user => user.unit === "Infraestructura") // Filtrar por unidad "Infraestructura"
    .map(user => (
      <div key={user.id} className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
        <div className="member d-flex align-items-start">
          <div className="member-info">
            <h4>{user.name}</h4>
            <span>{user.jobPosition}</span>
            <p>{user.description}</p>
            <div className="social">
              <a href={`mailto:${user.email}`}>
                <i className="bi bi-envelope-fill"></i>
              </a>
              {/* Agrega otros enlaces sociales según sea necesario */}
            </div>
          </div>
        </div>
      </div>
    ))}
</div>

        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Contacto</h2>
            <p>Nuestras vias para comunicarse.</p>
          </div>

          <div className="row">

            <div className="col-lg-5 d-flex align-items-stretch">
              <div className="info">


                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>requerimientosdcce@dch.cantv.com.ve</p>
                  <p>coinfra_cdh@cantv.com.ve</p>
                  <p>infraestructura@dch.cantv.com.ve</p>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Telefono Central:</h4>
                  <p>0212-9060200</p>
                </div>

                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style={{border:0 , width: 100% ,height: 290px}} ></iframe> */}
              </div>

            </div>

            <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
              <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" name="name" className="form-control" id="name" required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Your Email</label>
                    <input type="email" className="form-control" name="email" id="email" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Subject</label>
                  <input type="text" className="form-control" name="subject" id="subject" required />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Message</label>
                  <textarea className="form-control" name="message" rows="10" required></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center"><button type="submit">Send Message</button></div>
              </form>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};
