// src/contexts/SearchContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { fetchAgentInfo, fetchMapInfo } from '../services/api';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [agentInfo, setAgentInfo] = useState(null);
  const [mapInfo, setMapInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (agentTerm, mapTerm) => {
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
        const agentData = await fetchAgentInfo(agentTerm);
        displayAgentInfo(agentData);
      }

      if (mapTerm) {
        const mapData = await fetchMapInfo(mapTerm);
        displayMapInfo(mapData);
      }
    } catch (error) {
      console.error(error);
      displayError(error.message);
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
