import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getYear, getMonth } from 'date-fns'; // Puedes usar esta librería para manejar fechas

function TemperatureGraphic({ temperatures }) {
  const [dataByQuarter, setDataByQuarter] = useState({});
  const [dailyTemperature, setDailyTemperature] = useState({});

  useEffect(() => {
    // Función para organizar los datos por trimestre
    const organizeDataByQuarter = () => {
      const quarters = {
        Q1: [],
        Q2: [],
        Q3: [],
        Q4: [],
      };

      temperatures.forEach((temperature) => {
        const month = getMonth(new Date(temperature.measurement_date));
        const quarter =
          month <= 2
            ? 'Q1'
            : month <= 5
            ? 'Q2'
            : month <= 8
            ? 'Q3'
            : 'Q4';

        quarters[quarter].push({
          date: temperature.measurement_date,
          temperature: temperature.temperature,
        });
      });

      setDataByQuarter(quarters);
    };

    // Función para organizar los datos para la gráfica lineal diaria y promedio
    const organizeDataForLineChart = () => {
      const dailyData = {
        labels: [],
        temperatures: [],
        averageTemperatures: [],
      };

      temperatures.forEach((temperature) => {
        const date = temperature.measurement_date;
        const existingIndex = dailyData.labels.indexOf(date);

        if (existingIndex !== -1) {
          dailyData.temperatures[existingIndex].push(temperature.temperature);
        } else {
          dailyData.labels.push(date);
          dailyData.temperatures.push([temperature.temperature]);
        }
      });

      dailyData.labels.forEach((date, index) => {
        const temperatures = dailyData.temperatures[index];
        const averageTemperature =
          temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
        dailyData.averageTemperatures.push(averageTemperature.toFixed(2));
      });

      setDailyTemperature(dailyData);
    };

    organizeDataByQuarter();
    organizeDataForLineChart();
  }, [temperatures]);

  return (
    <div>
      <h2>Gráficas por Trimestre</h2>
      {Object.keys(dataByQuarter).map((quarter) => (
        <div key={quarter}>
          <h3>{quarter}</h3>
          <Line
            data={{
              labels: dataByQuarter[quarter].map((data) => data.date),
              datasets: [
                {
                  label: 'Temperatura',
                  data: dataByQuarter[quarter].map((data) => data.temperature),
                  fill: false,
                  borderColor: 'rgba(75,192,192,1)',
                  lineTension: 0.1,
                },
              ],
            }}
          />
        </div>
      ))}

      <h2>Gráfica Lineal de Temperatura Diaria y Promedio</h2>
      <Line
        data={{
          labels: dailyTemperature.labels,
          datasets: [
            {
              label: 'Temperatura Diaria',
              data: dailyTemperature.temperatures.map((temps) => temps[0]),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              lineTension: 0.1,
            },
            {
              label: 'Temperatura Promedio',
              data: dailyTemperature.averageTemperatures,
              fill: false,
              borderColor: 'rgba(192,75,192,1)',
              lineTension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
}

export default TemperatureGraphic;
