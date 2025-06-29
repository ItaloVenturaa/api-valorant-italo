// src/services/api.js
import axios from 'axios';

export const fetchAllAgents = async () => {
  const response = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
  return response.data.data;
};

export const fetchAllMaps = async () => {
  const response = await axios.get('https://valorant-api.com/v1/maps');
  return response.data.data;
};

export const fetchAgentInfo = async (name) => {
  const agents = await fetchAllAgents();
  const found = agents.find(agent => agent.displayName.toLowerCase() === name.toLowerCase());
  if (!found) throw new Error('Agente não encontrado');
  return found;
};

export const fetchMapInfo = async (name) => {
  const maps = await fetchAllMaps();
  const found = maps.find(map => map.displayName.toLowerCase() === name.toLowerCase());
  if (!found) throw new Error('Mapa não encontrado');
  return found;
};

export const fetchProtectedAgents = async (token) => {
  const response = await axios.get('http://localhost:8000/data/agents', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Busca protegida de mapas (apenas para admin)
export const fetchProtectedMaps = async (token) => {
  const response = await axios.get('http://localhost:8000/data/maps', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
