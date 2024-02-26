import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logoCantv from "../../img/CDHLogo.jpg"
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context)
  // Verifica si el usuario tiene un token y pertenece a la unidad de infraestructura
  // Verifica si el token ha expirado
  const tokenExpiration = store.tokenExpiration;
  const isTokenExpired = tokenExpiration && Date.now() > tokenExpiration;

  // Verifica si el usuario está autenticado y pertenece a la unidad de infraestructura
  const isUserAuthenticated = store.token !== null && store.user.unit === "Infraestructura";

  const navigate = useNavigate()
  // Función para cerrar sesión
  const handleLogout = () => {
    actions.logout();
    
  };

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
              {isUserAuthenticated && (<>
                <li className="dropdown">
                  <a href="#"><span>Actividades</span> <i className="bi bi-chevron-down"></i></a>
                  <ul>
                    <li><a href="#">Gestion Almacen</a></li>
                    <li className="dropdown">
                      <a href="/docs"><span>Documentos</span> <i className="bi bi-chevron-right"></i></a>
                      <ul>
                        <li><a href="/new-doc">Agregar Documentos</a></li>
                        <li><a href="#">Procedimientos</a></li>
                        <li><a href="#">Plantillas</a></li>
                        <li><a href="#">Normas</a></li>
                        <li><a href="#">De otras Gerencias</a></li>
                      </ul>
                    </li>
                    <li><a href="/activities">Registro Mantenimientos Energia</a></li>
                    <li><a href="/temp-register">Registro Temperaturas</a></li>
                    <li><a href="/pending-by-units">Actividades de Proveedores</a></li>
                    <li><a href="/register">Agregar Personal</a></li>
                  </ul>
                </li>
                 <li><a className="nav-link scrollto" href="/profile">Perfil</a></li>
                 </>
              )}
              <li><a className="nav-link scrollto" href="#contact">Contacto</a></li>
              <li><a className="nav-link scrollto" href="/">OpenDCIM</a></li>
              {isUserAuthenticated ? (
                <li><a className="getstarted scrollto" href="/" onClick={handleLogout}>Salir</a></li>
              ) : (
                <li><a className="getstarted scrollto" href="login">Ingreso Personal</a></li>
              )}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </>
  );
};
