import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";


function TemperatureGraphic() {
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState({});
  const { actions } = useContext(Context);
  const { getYearsTemperature, getTemperatureByQuarter } = actions;
  const navigate = useNavigate()

  useEffect(() => {
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

  const processDataForQuarter = (data) => {
    const processedData = {};
  
    Object.keys(data).forEach((quarter) => {
      processedData[quarter] = [];
  
      data[quarter].forEach((entry) => {
        const dateKey = `${entry.year}-${entry.month}-${entry.day}`;
        const airUnit = entry.air_unit;
  
        // Verificar si ya existe una entrada para esta fecha y airUnit
        const existingEntry = processedData[quarter].find(
          (item) => item.date === dateKey && item.airUnit === airUnit
        );
  
        if (existingEntry) {
          // Si ya existe, actualizar el promedio diario
          existingEntry.averageTemperature =
            (existingEntry.averageTemperature + entry.temperature) / 2;
        } else {
          // Si no existe, crear una nueva entrada
          processedData[quarter].push({
            date: dateKey,
            airUnit,
            averageTemperature: entry.temperature,
          });
        }
      });
    });
  
    console.log("ladata", processedData);
    return processedData;
  };

  const generateChartConfig = (quarter, data) => {
  // Ordenar los datos por fecha antes de crear la configuración del gráfico
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    labels: sortedData.map((entry) => entry.date),
    datasets: sortedData.length > 0
      ? [...new Set(sortedData.map(entry => entry.airUnit))].map((airUnit, airUnitIndex) => ({
        label: ` ${airUnit}`,
        data: sortedData
          .filter((entry) => entry.airUnit === airUnit)
          .map((entry) => ({
            x: entry.date,
            y: entry.averageTemperature,
          })),
        borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`,
        borderWidth: 3,
        fill: false,
      }))
      : [],
  };
};

  const handleYearChange = async (selectedYear) => {
    setSelectedYear(selectedYear);

    try {
      const data = await getTemperatureByQuarter(selectedYear);
      const processedData = processDataForQuarter(data);

      setQuarterlyData(processedData);
    } catch (error) {
      console.error("Error al obtener datos por trimestre", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="section-title mt-3">
        <h2>Gráficas de Temperatura por Trimestre</h2>
      </div>
      <div className='container'>
        <select className="m-3" onChange={(e) => handleYearChange(e.target.value)}>
          <option value="">Seleccionar Año</option>
          
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {Object.keys(quarterlyData).map((quarter, index) => (
          <div className='m-4 ' key={index}>
            {quarterlyData[quarter].length > 0 && (
              <>
                <h3>{`Trimestre ${index + 1}`}</h3>
                <Line
                  data={generateChartConfig(quarter, quarterlyData[quarter])}
                  options={{
                    responsive: true, 
                    scales: {
                      x: {
                        type: 'category',
                        position: 'bottom',
                      },
                      y: {
                        type: 'linear',
                        position: 'left',
                        beginAtZero: true,
                        suggestedMin: 0,
                        suggestedMax: 25,
                      },
                    },
                    
                  }}
                />
              </>
            )}
          </div>
        ))}
        <div className="container mb-3 mt-4">
        <button type="button" className="btn btn-secondary ms-3" onClick={goBack}>
          Volver
        </button>
        </div>
        </div>
    </>
  );
}

export default TemperatureGraphic;
