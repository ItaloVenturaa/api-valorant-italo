// src/pages/Home.jsx
import React from 'react';
import "../style/style.css";
import useAuth from '../hooks/useAuth';
import { Container, Alert } from 'react-bootstrap';
import { SearchProvider, useSearch } from '../contexts/SearchContext';
import { SelectedProvider } from '../contexts/SelectedContext';
import SearchBar from '../components/SearchBar';
import AgentCard from '../components/AgentCard';
import MapCard from '../components/MapCard';
import SelectedList from '../components/SelectedList';
import AdminBox from '../components/AdminBox';
import ImportDataButton from "../components/ImportDataButton";

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
  useAuth(); // Verifica se o usuário está autenticado

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <SelectedProvider>
      <SearchProvider>
        <div className="position-relative min-vh-100 d-flex align-items-center justify-content-center">
          <Container className="d-flex justify-content-center align-items-center">
            <div className="w-100" style={{ maxWidth: '700px' }}>
              <h1 className="text-center mb-4" style={{ color: '#e0e0e0' }}>
                Pesquisa Valorant
              </h1>

              {user?.isAdmin && (
                <div className="position-absolute top-0 end-0 p-3 d-flex flex-row gap-2">
                  <ImportDataButton />
                  <AdminBox />
                </div>
              )}

              <Content />
            </div>
          </Container>
        </div>
      </SearchProvider>
    </SelectedProvider>
  );
}
