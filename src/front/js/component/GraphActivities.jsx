import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Context } from "../store/appContext";

const GraphActivities = () => {
  const [chartData, setChartData] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const { store, actions } = useContext(Context);
  const { graphYear, getYears } = actions;
  const [availableYears, setAvailableYears] = useState([]);
  const [preventiveCount, setPreventiveCount] = useState(0);
  const [correctiveCount, setCorrectiveCount] = useState(0);

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

  // Este efecto se ejecutará cada vez que cambien los datos de actividades por año
  useEffect(() => {
    // Calcular la cantidad de mantenimientos preventivos y correctivos
    if (chartData && chartData.labels && chartData.datasets) {
      const preventiveCount = chartData.datasets[0].data.filter(type => type === 'Preventivo').length;
      const correctiveCount = chartData.datasets[0].data.filter(type => type === 'Correctivo').length;

      setPreventiveCount(preventiveCount);
      setCorrectiveCount(correctiveCount);
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
          data={{
            labels: ["Preventivo", "Correctivo"],
            datasets: [
              {
                label: "Cantidad de Actividades",
                data: [preventiveCount, correctiveCount],
                backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{ responsive: true }}
        />
      </div>
    </>
  );
};

export default GraphActivities;
