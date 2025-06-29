import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useSelected } from '../contexts/SelectedContext';

export default function SelectedList() {
  const { selectedItems, removeItem, clearAll } = useSelected();

  if (selectedItems.length === 0) {
    return <p className="text-center mt-4" style={{ color: '#e0e0e0' }}>Nenhum favorito selecionado ainda.</p>;
  }

  return (
    <Card className="mt-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Favoritos</strong>
        <Button variant="outline-danger" size="sm" onClick={clearAll}>
          Limpar todos
        </Button>
      </Card.Header>
      <ListGroup variant="flush">
        {selectedItems.map((item) => (
          <ListGroup.Item key={item.uuid || item.displayName} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.displayName}</strong> —{" "}
              {item.role?.displayName || (
                <span className="badge bg-info text-dark">Mapa</span>
              )}
            </div>
            <Button variant="primary" onClick={() => removeItem(item.uuid || item.displayName)}>
              Remover
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
