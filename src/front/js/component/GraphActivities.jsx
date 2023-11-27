import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Dropdown } from "react-bootstrap";

const GraphActivities = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activitiesData, setActivitiesData] = useState({});

  useEffect(() => {
    // Aquí puedes realizar la lógica para obtener los datos de actividades según el año seleccionado.
    // Puedes hacer una llamada a la API o usar datos de tu contexto, según tu implementación.

    // Supongamos que tienes un método getActivitiesByYear en tus acciones
    // const data = await actions.getActivitiesByYear(selectedYear);

    // Mock de datos
    const data = {
      labels: ["Actividad 1", "Actividad 2", "Actividad 3", "Actividad 4"],
      datasets: [
        {
          label: `Actividades ${selectedYear}`,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75,192,192,0.4)",
          hoverBorderColor: "rgba(75,192,192,1)",
          data: [65, 59, 80, 81],
        },
      ],
    };

    setActivitiesData(data);
  }, [selectedYear]);

  const years = [2022, 2023, 2024]; // Puedes obtener esta lista de años según tu lógica.

  return (
    <div>
      <h2>Gráfico de Actividades por Año</h2>
      <Dropdown onSelect={(year) => setSelectedYear(parseInt(year))}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Año: {selectedYear}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {years.map((year) => (
            <Dropdown.Item key={year} eventKey={year}>
              {year}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Bar
        data={activitiesData}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default GraphActivities;