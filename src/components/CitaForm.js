
import "../App.css";

// components/CitaForm.js
import { useState } from "react";
import { agregarCita } from "../services/firebaseConfig";


// Componente para el formulario de citas
export default function CitaForm() {
  const [nombre, setNombre] = useState("");
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [alerta, setAlerta] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar rango horario
    if (hora < "08:00" || hora > "17:00") {
      alert("La hora debe estar entre 08:00 y 17:00.");
      return;
    }

    try {
      //Agregar cita a Firebase
      await agregarCita({ nombre, hora, fecha });
      setNombre("");
      setHora("");
      setFecha("");
      setAlerta(true);

      setTimeout(() => setAlerta(false), 3000); // Ocultar alerta tras 3 segundos
    } catch (error) {
      console.error("Error al registrar cita:", error);// Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {alerta && (
        <div style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
          border: "1px solid #c3e6cb"
        }}>
          ✅ Cita agendada con éxito.
        </div>
      )}

      <h2>Registrar Cita </h2>

      <div>
        <label>Nombre del paciente</label><br />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Hora</label><br />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
          min="08:00"
          max="17:00"
        />
      </div>

      <div>
        <label>Fecha</label><br />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <button type="submit">Registrar</button>
    </form>
  );
}