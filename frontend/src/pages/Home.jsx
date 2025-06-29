import React from 'react';
import "../style/style.css";
import useAuth from '../hooks/useAuth';
import { Container, Alert } from 'react-bootstrap';
import { SearchProvider, useSearch } from '../contexts/SearchContext';
import { SelectedProvider } from '../contexts/SelectedContext'; // <- IMPORTADO AQUI
import SearchBar from '../components/SearchBar';
import AgentCard from '../components/AgentCard';
import MapCard from '../components/MapCard';
import SelectedList from '../components/SelectedList';

function ErrorMessage() {
  const { error } = useSearch();
  return error ? <Alert variant="danger" className="text-center mt-3">{error}</Alert> : null;
}

function Content() {
  const { agentInfo, mapInfo } = useSearch();

  return (
    <>
      <SearchBar />
      <ErrorMessage />
      {agentInfo && <AgentCard agent={agentInfo} />}
      {mapInfo && <MapCard map={mapInfo} />}
      <SelectedList />
    </>
  );
}

export default function Home() {
  useAuth(); // Verifica se o usuário está autenticado antes de renderizar a página

   return (
    <SelectedProvider> {/* <- Agora é o mais externo */}
      <SearchProvider> {/* <- Depois vem o Search */}
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="w-100" style={{ maxWidth: '700px' }}>
            <h1 className="text-center mb-4">Pesquisa Valorant</h1>
            <Content />
          </div>
        </Container>
      </SearchProvider>
    </SelectedProvider>
  );
}
