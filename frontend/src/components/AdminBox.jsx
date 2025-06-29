// src/components/AdminBox.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminBox() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!decoded?.isAdmin) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 999,
    }}>
      <button
        className="btn btn-outline-light"
        onClick={() => navigate('/register')}
      >
        Criar Usuário
      </button>
    </div>
  );
}
