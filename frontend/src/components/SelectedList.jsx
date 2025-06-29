import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useSelected } from '../contexts/SelectedContext';

export default function SelectedList() {
  const { selectedItems, removeItem, clearAll } = useSelected();

  if (selectedItems.length === 0) {
    return <p className="text-center mt-4">Nenhum favorito selecionado ainda.</p>;
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
        {selectedItems.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.displayName}</strong> —{" "}
              {item.role?.displayName || (
                <span className="badge bg-info text-dark">Mapa</span>
              )}
            </div>
            <Button variant="primary" onClick={() => removeItem(index)}>
              Remover
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
