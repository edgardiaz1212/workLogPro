import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getActivitiesByYear, getActivitiesByMonth } from "../flux/activityActions";

const GraphActivities = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Llamar a las funciones de flux para obtener datos
    // Aquí necesitas llamar a las funciones de flux para obtener datos de actividades por año y mes
    // Utiliza los datos recibidos para configurar el estado de chartData
  }, []);

  return (
    <div>
      <h2>Gráfico de Actividades</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default GraphActivities;