import React, { createContext, useContext, useState } from 'react';

const SelectedContext = createContext();

export const SelectedProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = (item) => {
    if (!selectedItems.some((i) => i.uuid === item.uuid)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (uuid) => {
    setSelectedItems(selectedItems.filter((item) => item.uuid !== uuid));
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  return (
    <SelectedContext.Provider value={{ selectedItems, addItem, removeItem, clearAll }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => useContext(SelectedContext);