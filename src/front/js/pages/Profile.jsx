import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Profile = () => {
    const { store, actions } = useContext(Context);
    const [editable, setEditable] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        actions.getUserProfile();
    }, [actions]);

    useEffect(() => {
        setEditedProfile(store.profile || {});
    }, [store.profile]);

    const fieldLabels = {
        name: "Nombre",
        surname: "Apellido",
        email: "Correo Corporativo",
        unit: "Unidad",
        emailDCH: "Correo DCH",
        jobPosition: "Cargo",
        description: "Descripción"
        // ... Agrega otros campos según sea necesario
    };

    const fieldOrder = ["name", "surname", "email", "emailDCH", "unit", "jobPosition", "description"];

    const unitsList = ["Infraestructura", "Operaciones", "Planificación y Proyectos", "Gerencia"];
    const jobPositionsList = ["Consultor", "Lider", "Gerente"];

    const handleEditClick = () => {
        setEditable(true);
    };

    const handleSaveClick = async () => {
        setEditable(false);

        // Aquí puedes manejar la lógica para actualizar el perfil y la contraseña
        await actions.updateUserProfile({ ...editedProfile, password: newPassword });
    };

    const handleInputChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    return (
        <div className="container mt-5">
            <div className="section-title mt-3">
              <h2>Perfil de Usuario</h2>
            </div>
            
            {fieldOrder.map((fieldName) => (
                <div key={fieldName} className="mb-3">
                    <label htmlFor={fieldName} className="form-label">{fieldLabels[fieldName]}</label>
                    {fieldName === "unit" ? (
                        <select
                            className="form-select"
                            id={fieldName}
                            name={fieldName}
                            value={editedProfile[fieldName]}
                            onChange={handleInputChange}
                            disabled={!editable}
                        >
                            {unitsList.map((unit) => (
                                <option key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    ) : fieldName === "jobPosition" ? (
                        <select
                            className="form-select"
                            id={fieldName}
                            name={fieldName}
                            value={editedProfile[fieldName]}
                            onChange={handleInputChange}
                            disabled={!editable}
                        >
                            {jobPositionsList.map((position) => (
                                <option key={position} value={position}>{position}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={fieldName === "password" ? "password" : "text"}
                            className="form-control"
                            id={fieldName}
                            name={fieldName}
                            value={editedProfile[fieldName]}
                            onChange={fieldName === "password" ? handlePasswordChange : handleInputChange}
                            readOnly={!editable}
                        />
                    )}
                </div>
            ))}
            {editable && (
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handlePasswordChange}
                    />
                </div>
            )}
            {editable ? (
                <>
                    <button className="btn btn-primary m-1" onClick={handleSaveClick}>Guardar</button>
                    <button className="btn btn-secondary m-1" onClick={() => setEditable(false)}>Cancelar</button>
                </>
            ) : (
                <button className="btn btn-info m-1" onClick={handleEditClick}>Editar</button>
            )}
        </div>
    );
};

export default Profile;
