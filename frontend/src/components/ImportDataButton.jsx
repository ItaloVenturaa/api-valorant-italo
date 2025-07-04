import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function ImportDataButton() {
  const handleImport = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:8000/import", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.message === "Já importado") {
        alert("Os dados já foram importados anteriormente.");
      } else {
        alert(`Importação concluída: ${res.data.agents} agentes e ${res.data.maps} mapas`);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao importar dados.");
    }
  };

 return (
  <Button variant="outline-light" onClick={handleImport}>
    Importar Dados
  </Button>
);
}
