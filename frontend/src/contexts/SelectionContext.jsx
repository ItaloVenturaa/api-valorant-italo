import React, { createContext, useState, useContext } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = (item) => {
    const alreadyExists = selectedItems.some((el) => el.uuid === item.uuid);
    if (!alreadyExists) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (uuid) => {
    setSelectedItems((prev) => prev.filter(item => item.uuid !== uuid));
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  return (
    <SelectionContext.Provider value={{ selectedItems, addItem, removeItem, clearAll }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
