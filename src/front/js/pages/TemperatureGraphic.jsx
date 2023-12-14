import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function TemperatureGraphic() {
  // Estado para almacenar datos de temperatura
  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [],
  });

  // Simula datos de temperatura (puedes reemplazarlo con datos reales del estado)
  const sampleData = {
    air1: [25, 28, 30, 22, 26, 27, 29], // Temperaturas para el primer trimestre
    air2: [23, 26, 28, 21, 24, 25, 27], // Temperaturas para el segundo trimestre
    air3: [27, 30, 32, 25, 28, 29, 31], // Temperaturas para el tercer trimestre
  };

  useEffect(() => {
    // Lógica para preparar datos y actualizar el estado
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const datasets = [];

    // Iterar sobre cada aire
    for (const airUnit in sampleData) {
      if (sampleData.hasOwnProperty(airUnit)) {
        const temperatures = sampleData[airUnit];

        // Calcular el promedio de temperaturas por mes
        const averageTemperatures = Array.from({ length: 12 }, (_, index) => {
          const start = index * 3;
          const end = start + 3;
          const trimesterTemperatures = temperatures.slice(start, end);
          const trimesterAverage = trimesterTemperatures.reduce((sum, temp) => sum + temp, 0) / trimesterTemperatures.length;
          return Math.round(trimesterAverage * 100) / 100; // Redondear a dos decimales
        });

        datasets.push({
          label: `Aire ${airUnit}`,
          data: averageTemperatures,
          borderColor: getRandomColor(), // Función para obtener un color aleatorio
          fill: false,
        });
      }
    }

    // Actualizar el estado con los datos preparados
    setTemperatureData({
      labels,
      datasets,
    });
  }, []);

  // Función para obtener un color aleatorio en formato hexadecimal
  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div>
      <h2>Gráficas de Temperatura por Trimestre</h2>
      <Line data={temperatureData} />
    </div>
  );
}

export default TemperatureGraphic;
