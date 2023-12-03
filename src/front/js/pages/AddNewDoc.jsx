import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../store/appContext';

const initialState = {
  document_name: '',
  document_type: '',
  document_version: '',
  document_unit: '',
  document_file: null,
};

function AddNewDoc() {
  const [newDoc, setNewDoc] = useState(initialState);
  const { store, actions } = useContext(Context);

  // Función para manejar cambios en los campos del formulario
 // Función para manejar cambios en los campos del formulario
 const handleChange = (e) => {
  const { name, value } = e.target;
  setNewDoc({ ...newDoc, [name]: value });
};

 // Función para manejar cambios en el campo de carga de archivos
 const handleFileChange = (e) => {
  const file = e.target.files[0];
  setNewDoc({ ...newDoc, document_file: file });
};
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
    formData.append('file', newDoc.document_file);
    formData.append('document_name', newDoc.document_name);
    formData.append('document_type', newDoc.document_type);
    formData.append('document_version', newDoc.document_version);
    formData.append('document_unit', newDoc.document_unit);

      // Realizar la solicitud para registrar el nuevo documento
      const response = await actions.addDocument(formData);

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
      console.error('Error para registrar el documento:', error);
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
      <form className='container w-5' onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Nombre del Documento
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            id="document_name"
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
          <span className="input-group-text" id="basic-addon3">
            Version
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Version"
            id='document_version'
            aria-label="document_version"
            aria-describedby="basic-addon3"
            name="document_version"
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
            value={newDoc.document_unit}
          >
            <option value="">Seleccionar Area</option>
            <option value="infraestructura">Infraestructura</option>
            <option value="operaciones">Operaciones</option>
            <option value="gerencia">Gerencia</option>
            <option value="otros">Otras Gerencias</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              onChange={handleFileChange}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              {newDoc.document_file ? newDoc.document_file.name : 'Seleccionar archivo'}
            </label>
          </div>
          
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar Documento
        </button>
      </form>
    </>
  );
}

export default AddNewDoc;