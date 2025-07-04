// src/contexts/SearchContext.jsx
import React, { createContext, useState, useContext } from 'react';
import {
  fetchAgentInfo,
  fetchMapInfo,
  fetchAgents,
  fetchMaps
} from '../services/api';
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [agentInfo, setAgentInfo] = useState(null);
  const [mapInfo, setMapInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (agentTerm, mapTerm) => {
    const token = localStorage.getItem('token');

    try {
      if (!agentTerm && !mapTerm) {
        displayError('Preencha pelo menos um campo.');
        return;
      }

      if (agentTerm && mapTerm) {
        displayError('Preencha apenas um dos campos: Agente ou Mapa.');
        return;
      }

      clearResults();

      if (agentTerm) {
        const agents = await fetchAgents(token);
        const found = agents.find(agent =>
          agent.displayName.toLowerCase() === agentTerm.toLowerCase()
        );
        if (!found) throw new Error('Agente não encontrado');
        displayAgentInfo(found);
      }

      if (mapTerm) {
        const maps = await fetchMaps(token);
        const found = maps.find(map =>
          map.displayName.toLowerCase() === mapTerm.toLowerCase()
        );
        if (!found) throw new Error('Mapa não encontrado');
        displayMapInfo(found);
      }


    } catch (error) {
      console.error(error);
      displayError(error.response?.data?.error || error.message);
    }
  };

  const clearResults = () => {
    setAgentInfo(null);
    setMapInfo(null);
    setError('');
  };

  const displayAgentInfo = (agentData) => {
    setAgentInfo(agentData);
    setMapInfo(null);
  };

  const displayMapInfo = (mapData) => {
    setMapInfo(mapData);
    setAgentInfo(null);
  };

  const displayError = (message) => {
    setError(message);
    setAgentInfo(null);
    setMapInfo(null);
  };

  return (
    <SearchContext.Provider value={{ agentInfo, mapInfo, error, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
