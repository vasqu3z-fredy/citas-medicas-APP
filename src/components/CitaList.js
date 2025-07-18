// src/components/CitaList.js
import { useEffect, useState } from "react";
import { obtenerCitas } from "../services/firebaseConfig";

export default function CitaList() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para cargar citas
  const cargarCitas = async () => {
    setLoading(true);
    const data = await obtenerCitas();
    setCitas(data);
    setLoading(false);
  };

  // Ejecutar una vez al montar
  useEffect(() => {
    cargarCitas();
  }, []);

  return (
    <div>
      <h2>Citas Registradas</h2>
      
      <button onClick={cargarCitas} style={{ marginBottom: "10px" }}>
        🔄 Actualizar citas
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : citas.length === 0 ? (
        <p>No hay citas por ahora.</p>
      ) : (
        citas.map((cita) => (
          <div
            key={cita.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <p><strong>Paciente:</strong> {cita.nombre}</p>
            <p><strong>Hora:</strong> {cita.hora}</p>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
          </div>
        ))
      )}
    </div>
  );
}
