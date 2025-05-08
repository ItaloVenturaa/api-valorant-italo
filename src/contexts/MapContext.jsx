// src/contexts/MapContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [mapError, setMapError] = useState('');

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await axios.get('https://valorant-api.com/v1/maps');
        setMaps(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar mapas:', error);
      }
    };
    fetchMaps();
  }, []);

  return (
    <MapContext.Provider value={{ maps, selectedMap, setSelectedMap, mapError, setMapError }}>
      {children}
    </MapContext.Provider>
  );
};
