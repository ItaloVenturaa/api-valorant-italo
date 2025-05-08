// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSearch } from '../contexts/SearchContext';

export default function SearchBar() {
  const { handleSearch } = useSearch();
  const [agentQuery, setAgentQuery] = useState('');
  const [mapQuery, setMapQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(agentQuery.trim(), mapQuery.trim());
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form.Label>Pesquisar Agente:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do Agente"
            value={agentQuery}
            onChange={(e) => setAgentQuery(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Form.Label>Pesquisar Mapa:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do Mapa"
            value={mapQuery}
            onChange={(e) => setMapQuery(e.target.value)}
          />
        </Col>
        <Col xs="auto" className="d-flex align-items-end">
          <Button type="submit" variant="primary">Pesquisar</Button>
        </Col>
      </Row>
    </Form>
  );
}
