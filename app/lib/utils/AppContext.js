"use client";

import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentIdPage, setCurrentIdPage] = useState(0);

  return (
    <AppContext.Provider value={{ currentIdPage, setCurrentIdPage }}>
      {children}
    </AppContext.Provider>
  );
};
