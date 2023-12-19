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

      // Procesar datos para obtener promedio por día y air_unit
      const processedData = {};
      console.log(processedData)
      Object.keys(data).forEach((quarter) => {
        processedData[quarter] = {};

        data[quarter].forEach((entry) => {
          const dateKey = `${entry.year}-${entry.month}-${entry.day}`;
          const airUnit = entry.air_unit;

          // Crear un objeto para el día si no existe
          if (!processedData[quarter][dateKey]) {
            processedData[quarter][dateKey] = {};
          }

          // Crear un array para el air_unit si no existe
          if (!processedData[quarter][dateKey][airUnit]) {
            processedData[quarter][dateKey][airUnit] = [];
          }

          // Agregar la temperatura al array
          processedData[quarter][dateKey][airUnit].push(entry.temperature);
        });
      });

      // Calcular el promedio por día y air_unit
      const averagedData = {};
      Object.keys(processedData).forEach((quarter) => {
        averagedData[quarter] = [];

        Object.keys(processedData[quarter]).forEach((dateKey) => {
          const dateAverages = Object.keys(processedData[quarter][dateKey]).map((airUnit) => ({
            date: dateKey,
            airUnit,
            averageTemperature:
              processedData[quarter][dateKey][airUnit].reduce((sum, temp) => sum + temp, 0) /
              processedData[quarter][dateKey][airUnit].length,
          }));
          console.log(dateAverages)
          averagedData[quarter] = averagedData[quarter].concat(dateAverages);
        });
      });

      setQuarterlyData(averagedData);
    } catch (error) {
      console.error("Error al obtener datos por trimestre", error);
    }
  };
  console.log("data", quarterlyData)
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
              labels: quarterlyData[quarter].map((entry) => entry.date),
              datasets: quarterlyData[quarter].length > 0
                ? Object.keys(quarterlyData[quarter][0]).map((airUnit, airUnitIndex) => ({
                  label: `Aire ${airUnitIndex + 1}`,
                  data: quarterlyData[quarter]
                    .filter((entry) => entry.airUnit === airUnit)
                    .map((entry) => parseFloat(entry.averageTemperature)),
                  borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`,
                  borderWidth: 2,
                  fill: false,

                }))
                : [],
            }}
            options={{
              scales: {
                x: {
                  type: 'category',  // Cambiado a 'category'
                  position: 'bottom',
                },
                y: {
                  type: 'linear',
                  position: 'left',
                  beginAtZero: true,
                  suggestedMin: 0,  // Establecer un valor mínimo sugerido
                  suggestedMax: 25,
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
