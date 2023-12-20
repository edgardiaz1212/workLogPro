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

        processedData[quarter].push({
          date: dateKey,
          airUnit,
          averageTemperature: entry.temperature,
        });
      });
    });

    return processedData;
  };

  const generateChartConfig = (quarter, data) => {
    return {
      labels: data.map((entry) => entry.date),
      datasets: data.length > 0
        ? [...new Set(data.map(entry => entry.airUnit))].map((airUnit, airUnitIndex) => ({
          label: `Aire ${airUnitIndex + 1}`,
          data: data
            .filter((entry) => entry.airUnit === airUnit)
            .map((entry) => ({
              x: entry.date,
              y: entry.averageTemperature,
            })),
          borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`,
          borderWidth: 2,
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
        <div key={index}>
          {quarterlyData[quarter].length > 0 && (
            <>
              <h3>{`Trimestre ${index + 1}`}</h3>
              <Line
                data={generateChartConfig(quarter, quarterlyData[quarter])}
                options={{
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
    <button type="button" className="btn btn-secondary ms-3" onClick={goBack}>
                                Volver
                            </button></div>
    </>
  );
}

export default TemperatureGraphic;
