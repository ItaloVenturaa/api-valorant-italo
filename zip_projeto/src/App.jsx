import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios';
import './App.css';
import AgentCard from './components/AgentCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';


function App() {
  const [agentName, setAgentName] = useState('');
  const [agentData, setAgentData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
      const agents = res.data.data;
      const found = agents.find((a) =>
        a.displayName.toLowerCase() === agentName.trim().toLowerCase()
      );
      setAgentData(found || null);
    } catch (err) {
      console.error(err);
      setAgentData(null);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center">Valorant Agentes</h1>
      <Form onSubmit={handleSearch} className="my-4">
        <Form.Group className="mb-3">
          <Form.Label>Pesquisar Agente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Fade"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Pesquisar</Button>
      </Form>

      <AgentCard agent={agentData} />
    </Container>
  );
}

export default App;