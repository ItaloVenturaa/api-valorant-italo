// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const fetchAgents = async (token) => {
  const response = await axios.get(`${API_BASE}/data/agents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const fetchMaps = async (token) => {
  const response = await axios.get(`${API_BASE}/data/maps`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//(usando Mongo)
export const fetchAgentInfo = async (token, name) => {
  const all = await fetchAgents(token);
  const found = all.find(agent => agent.displayName.toLowerCase() === name.toLowerCase());
  if (!found) throw new Error('Agente não encontrado');
  return found;
};

//(usando Mongo)
export const fetchMapInfo = async (token, name) => {
  const all = await fetchMaps(token);
  const found = all.find(map => map.displayName.toLowerCase() === name.toLowerCase());
  if (!found) throw new Error('Mapa não encontrado');
  return found;
};
