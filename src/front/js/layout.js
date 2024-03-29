import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Docs from "./pages/Docs.jsx";
import Activities from "./pages/Activities.jsx";
import RegisterEnergy from "./pages/RegisterEnergy.jsx";
import AddNewDoc from "./pages/AddNewDoc.jsx";
import Profile from "./pages/Profile.jsx";
import TemperatureRegistry from "./pages/TemperatureRegistry.jsx";
import TemperatureGraphic from "./pages/TemperatureGraphic.jsx";
import PendingByProviders from "./pages/PendingByProviders.jsx";
import PendingListByProvider from "./pages/PendingListByProvider.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path='/login' />
                        <Route element={<Docs />} path="/docs" />
                        <Route element={<Activities />} path="/activities" />
                        <Route element={<RegisterEnergy />} path="/registro-energia" />
                        <Route element={<AddNewDoc />} path="/new-doc" />
                        <Route element={<Profile/>} path="/profile"/>
                        <Route element={<TemperatureRegistry/>} path="/temp-register"/>
                        <Route element={<TemperatureGraphic/>} path="/temp-graphic"/>
                        <Route element={<PendingByProviders/>} path="/pending-by-units"/>
                        <Route element={<PendingListByProvider/>} path="/pending-list-by-provider/:provider"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
