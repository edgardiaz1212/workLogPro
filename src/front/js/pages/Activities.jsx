import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
import { Context } from "../store/appContext";

const Activities = () => {
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
      graphYear(selectedYear).then((data) => {
        // Procesar los datos para crear el gráfico de barras agrupadas
        if (data.activities) {
          const groupedChartData = data.activities.reduce((acc, activity) => {
            const year = activity.year;
            const month = activity.mes;

            const existingDataset = acc.find((dataset) => dataset.label === activity.actividad);

            if (existingDataset) {
              existingDataset.data[month - 1]++;
            } else {
              const newDataset = {
                label: activity.actividad,
                data: Array(12).fill(0),
                tipo_de_mantenimiento: activity.tipo_de_mantenimiento, // Agrega el tipo de mantenimiento al dataset
              };
              newDataset.data[month - 1]++;
              acc.push(newDataset);
            }

            return acc;
          }, []);

          setChartData({
            labels: Array.from({ length: 12 }, (_, i) => i + 1),
            datasets: groupedChartData,
          });
        } else {
          console.error("Error al procesar datos:", data.error);
        }
      });
    }
  }, [selectedYear]);

  return (
    <>
      <div className="container">
        <h2>Gráfico de Actividades</h2>
        <select onChange={(e) => handleYearChange(e.target.value)}>
          <option value="">Seleccionar Año</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <div className="border border-danger">
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
                  ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const dataset = chartData.datasets[tooltipItem.datasetIndex];
                      const label = dataset.label || '';
                      const tipoMantenimiento = dataset.tipo_de_mantenimiento || '';
                      return `${label}:  (${tipoMantenimiento})`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Activities;