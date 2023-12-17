import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Context } from '../store/appContext';

function TemperatureGraphic() {
  
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const {actions} =useContext(Context)
  const {getYearsTemperature} = actions
  useEffect(() => {
    // Llamar a la función de flux para obtener los años disponibles
    const fetchAvailableYears = async () => {
        try {
            const years = await getYearsTemperature();
            setAvailableYears(years);

        } catch (error) {
            console.error("Error al obtener años disponibles", error);
        }
    };

    fetchAvailableYears();
}, [getYearsTemperature]);

  
  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
};
  return (
    <div className="section-title mt-3">
      <h2>Gráficas de Temperatura por Trimestre</h2>
      <select className="m-3" onChange={(e) => handleYearChange(e.target.value)}>
                    <option value="">Seleccionar Año</option>
                    {availableYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
      
      
    </div>
  );
}

export default TemperatureGraphic;
