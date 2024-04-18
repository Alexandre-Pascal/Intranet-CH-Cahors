"use client";
// globalStateContext.js
import React, { createContext, useState, useContext } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <GlobalStateContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
