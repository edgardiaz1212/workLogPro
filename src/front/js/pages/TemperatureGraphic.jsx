import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Context } from '../store/appContext';

function TemperatureGraphic() {
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState({});
  const { actions } = useContext(Context);
  const { getYearsTemperature, getTemperatureByQuarter } = actions;

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

  const handleYearChange = async (selectedYear) => {
    setSelectedYear(selectedYear);

    try {
      // Obtener datos por trimestre para el año seleccionado
      const data = await getTemperatureByQuarter(selectedYear);
      setQuarterlyData(data);
    } catch (error) {
      console.error("Error al obtener datos por trimestre", error);
    }
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

      {/* Renderizar gráficas por trimestre */}
      {Object.keys(quarterlyData).map((quarter, index) => (
        <div key={index}>
          <h3>{`Trimestre ${index + 1}`}</h3>
          <Line
            data={{
              labels: quarterlyData[quarter].map((entry) => entry.measurement_time),
              datasets: [
                {
                  label: 'Temperatura',
                  data: quarterlyData[quarter].map((entry) => entry.temperature),
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 2,
                  fill: false,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Meses',
                  },
                },
                y: {
                  type: 'linear',
                  position: 'left',
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Temperatura',
                  },
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default TemperatureGraphic;
