// src/components/AdminBox.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function AdminBox() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!decoded?.isAdmin) return null;

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Criar Usuário
    </Button>
  );
}
