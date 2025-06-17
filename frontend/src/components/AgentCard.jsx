import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default function AgentCard({ agent }) {
  if (!agent) return null;

  return (
    <Card className="text-center my-4">
      <Card.Img variant="top" src={agent.fullPortrait} alt={agent.displayName} style={{ width: '400px', marginLeft: '30%' }}/>
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
      </Card.Body>
    </Card>
  );
}
