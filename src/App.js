// App.js y llamada a los componentes
import React from "react";
import CitaForm from "./components/CitaForm";
import CitaList from "./components/CitaList";


//función principal de la aplicación. llamada a los componentes
function App() {
  return (
    <div className="App">
      <h1>Formulario de Citas para Ortodoncia</h1>
      <CitaForm />
      <hr />
      <CitaList />
    </div>
  );
}

export default App;
