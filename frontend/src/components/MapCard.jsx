// src/components/MapCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

export default function MapCard({ map }) {
  if (!map) return null;

  return (
    <Card className="text-center my-4">
      {map.splash && (
        <Card.Img
          variant="top"
          src={map.splash}
          alt={map.displayName}
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title>{map.displayName}</Card.Title>
        <Card.Text>{map.narrativeDescription || 'Sem descrição disponível.'}</Card.Text>
      </Card.Body>
    </Card>
  );
}
