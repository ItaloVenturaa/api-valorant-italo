import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useSelected } from '../contexts/SelectedContext'; // ✅ nome correto

export default function AgentCard({ agent }) {
  const { addItem } = useSelected(); // ✅ função do contexto

  if (!agent) return null;

  return (
    <Card className="text-center my-4">
      <Card.Img
        variant="top"
        src={agent.fullPortrait}
        alt={agent.displayName}
        style={{ width: '400px', marginLeft: '30%' }}
      />
      <Card.Body>
        <Card.Title>{agent.displayName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {agent.role?.displayName}
          {agent.role?.displayIcon && (
            <img
              src={agent.role.displayIcon}
              alt={agent.role.displayName}
              style={{ width: '24px', marginLeft: '8px' }}
            />
          )}
        </Card.Subtitle>
        <Card.Text>{agent.description}</Card.Text>

        <h5>Habilidades</h5>
        <ListGroup>
          {agent.abilities.map((ability, index) => (
            <ListGroup.Item key={index}>
              {ability.displayIcon && (
                <img
                  src={ability.displayIcon}
                  alt={ability.displayName}
                  style={{ width: '24px', marginRight: '8px' }}
                />
              )}
              <strong>{ability.displayName}</strong> — {ability.description}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button variant="success" className="mt-3" onClick={() => addItem(agent)}>
          Adicionar aos Favoritos
        </Button>
      </Card.Body>
    </Card>
  );
}
