import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelected } from '../contexts/SelectedContext'; // ✅ nome correto

export default function MapCard({ map }) {
  const { addItem } = useSelected(); // ✅ função do contexto

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

        <Button variant="success" className="mt-3" onClick={() => addItem(map)}>
          Adicionar aos Favoritos
        </Button>
      </Card.Body>
    </Card>
  );
}
