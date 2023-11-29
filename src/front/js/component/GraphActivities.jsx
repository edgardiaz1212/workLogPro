import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Context } from "../store/appContext";

const GraphActivities = () => {
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 12 }, (_, i) => i + 1), // Meses del 1 al 12
    datasets: [],
  });
  const [selectedYear, setSelectedYear] = useState("");
  const { store, actions } = useContext(Context);
  const { graphYear, getYears } = actions;
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    // Llamar a la función de flux para obtener los años disponibles
    const fetchAvailableYears = async () => {
      try {
        const years = await getYears();
        setAvailableYears(years);
      } catch (error) {
        console.error("Error al obtener años disponibles", error);
      }
    };

    fetchAvailableYears();
  }, [getYears]);

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  useEffect(() => {
    // Llamar a la función de flux para obtener datos de actividades por año
    if (selectedYear) {
      graphYear(selectedYear);
    }
  }, [selectedYear]);

  useEffect(() => {
    // Procesar los datos para crear el gráfico de barras agrupadas
    if (chartData.activities) {
      const groupedChartData = chartData.activities.reduce((acc, activity) => {
        const month = activity.mes;
  
        const existingDataset = acc.find((dataset) => dataset.label === activity.actividad);
  
        if (existingDataset) {
          existingDataset.data[month - 1]++;
        } else {
          const newDataset = {
            label: activity.actividad,
            data: Array(12).fill(0),
          };
          newDataset.data[month - 1]++;
          acc.push(newDataset);
        }
  
        return acc;
      }, []);
      
      setChartData((prevData) => ({
        ...prevData,
        datasets: groupedChartData,
      }));
    }
  }, [chartData]);

  return (
    <>
      <select onChange={(e) => handleYearChange(e.target.value)}>
        <option value="">Seleccionar Año</option>
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div>
        <h2>Gráfico de Actividades</h2>
       <Bar
  data={chartData}
  options={{
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }}
/>
      </div>
    </>
  );
};

export default GraphActivities;
