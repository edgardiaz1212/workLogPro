import React from "react";

function Activities() {
    return (
        <>
        <p>fehca de la actividad, control de incidente, control de cambio cor, control de cambio dcce, tecnico , nombre y apellido.,personal infra, nombre y apellido</p>
            <p>actividad(1 mant motognerador, 1.1 prueba con carga. 1.2 mant prev)2mant transfer, 3 Mantenimiento tableros electronicos, 4 Mantenimiento extratores, 5 Mantenimiento baterias UPS, 6 Mantenimiento transformadores, 7 Mantenimiento A/A de presión  , actividad satisfactoria, si no.</p>
            <div className="container m-3">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <span className="input-group-text" id="basic-addon2">@example.com</span>
                </div>

                <div className="mb-3">
                    <label for="basic-url" className="form-label">Your vanity URL</label>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" />
                    </div>
                    <div className="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    <span className="input-group-text">.00</span>
                </div>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" />
                    <span className="input-group-text">@</span>
                    <input type="text" className="form-control" placeholder="Server" aria-label="Server" />
                </div>

                <div className="input-group">
                    <span className="input-group-text">With textarea</span>
                    <textarea className="form-control" aria-label="With textarea"></textarea>
                </div>
            </div>
        </>
    )
}
export default Activities