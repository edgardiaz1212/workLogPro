import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../store/appContext';

const initialState = {
  document_name: '',
  document_type: '',
  document_version: '',
  document_unit: '',
};

function AddNewDoc() {
  const [newDoc, setNewDoc] = useState(initialState);
  const { store, actions } = useContext(Context);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoc({ ...newDoc, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud para registrar el nuevo documento
      const response = await actions.addDocument(newDoc);

      // Verificar la respuesta del backend
      if (response && response.msg) {
        // Mostrar mensaje de éxito
        toast.success(response.msg);

        // Limpiar el formulario después de un registro exitoso
        setNewDoc(initialState);
      } else {
        // Mostrar mensaje de error si no hay una respuesta exitosa
        toast.error('Error al registrar el documento');
      }
    } catch (error) {
      console.error('Error al registrar el documento:', error);
      // Mostrar mensaje de error en caso de una excepción
      toast.error('Error inesperado al registrar el documento');
    }
  };

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div className="section-title mt-3">
        <h2>Añadir nuevos Documentos</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Nombre del Documento
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            aria-label="document_name"
            aria-describedby="basic-addon1"
            name="document_name"
            value={newDoc.document_name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">Tipo de Documento </span>

            <select
              className="form-select"
              aria-label="document_type"
              id="document_type"
              name="document_type"
              onChange={handleChange}
              value={newDoc.document_type}
            >
              <option value="">Seleccionar tipo</option>
              <option value="procedimiento">Procedimiento</option>
              <option value="plantilla">Plantilla</option>
              <option value="norma">Norma</option>
              <option value="otros">De Otras Gerencias</option>
            </select>
          </div>
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Nombre del Documento
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            aria-label="document_name"
            aria-describedby="basic-addon1"
            name="document_name"
            value={newDoc.document_name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            Version
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Version"
            aria-label="document_version"
            aria-describedby="basic-addon3"
            name="document_name"
            value={newDoc.document_version}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            Version
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Version"
            aria-label="document_version"
            aria-describedby="basic-addon3"
            name="document_name"
            value={newDoc.document_version}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon5">Unidad </span>

            <select
              className="form-select"
              aria-label="document_unit"
              id="document_unit"
              name="document_unit"
              onChange={handleChange}
              value={newDoc.unit}
            >
              <option value="">Seleccionar Cargo</option>
              <option value="Infraestructura">Infraestructura</option>
              <option value="Operaciones">Operaciones</option>
              <option value="Gerencia">Gerencia</option>
            </select>
          </div>

        

        <button type="submit" className="btn btn-primary">
          Registrar Documento
        </button>
      </form>
    </>
  );
}

export default AddNewDoc;