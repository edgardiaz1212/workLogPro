import React from "react";
import { Link } from "react-router-dom";
import logoCantv from "../../img/CDHLogo.jpg"

export const Navbar = () => {
  return (
    <>
      <header id="header" className="navbar sticky-top">
        <div className="container d-flex align-items-center">

         <a href="/" className="logo me-auto"><img src={logoCantv} alt="" className="img-fluid" /></a>

          <nav id="navbar" className="navbar">
            <ul>
              <li><a className="nav-link scrollto active" href="/#hero">Inicio</a></li>
              <li><a className="nav-link scrollto" href="/#about">About</a></li>
              <li><a className="nav-link scrollto" href="/#cta">Solicitudes Colocacion</a></li>

              <li><a className="nav-link scrollto" href="#team">Equipo</a></li>
              <li className="dropdown"><a href="#"><span>Actividades</span> <i className="bi bi-chevron-down"></i></a>
                <ul>
                  <li><a href="#">Gestion Almacen</a></li>
                  <li className="dropdown"><a href="/docs"><span>Documentos</span> <i className="bi bi-chevron-right"></i></a>
                    <ul>
                      <li><a href="#">Procedimientos</a></li>
                      <li><a href="#">Plantillas</a></li>
                      <li><a href="#">Normas</a></li>
                      <li><a href="#">De otras Gerencias</a></li>
                    </ul>
                  </li>
                  <li><a href="/activities">Registro Actividad Energia</a></li>
                  <li><a href="#">Drop Down 4</a></li>
                </ul>
              </li>
              <li><a className="nav-link scrollto" href="#contact">Contacto</a></li>
              <li><a className="nav-link scrollto" href="/">OpenDCIM</a></li>
              <li><a className="getstarted scrollto" href="login">Ingreso Personal</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </>
  );
};
