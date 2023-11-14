import React from "react";
import { Link } from "react-router-dom";
import logoCantv from "../../img/cantv.jpg"

export const Navbar = () => {
	return (
		<>
		 <header id="header" className="fixed-top ">
    <div className="container d-flex align-items-center">

      <h1 className="logo me-auto"><a href="index.html">DCCE</a></h1>
     
      <a href="index.html" className="logo me-auto"><img src={logoCantv} alt="" className="img-fluid"/></a>

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto active" href="#hero">Inicio</a></li>
          <li><a className="nav-link scrollto" href="#about">About</a></li>
          <li><a className="nav-link scrollto" href="#services">Servicios</a></li>
          <li><a className="nav-link   scrollto" href="#portfolio">Portafolio</a></li>
          <li><a className="nav-link scrollto" href="#team">Equipo</a></li>
          <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <li><a className="nav-link scrollto" href="#contact">Contacto</a></li>
          <li><a className="getstarted scrollto" href="#about">Registro</a></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
		</>
	);
};
