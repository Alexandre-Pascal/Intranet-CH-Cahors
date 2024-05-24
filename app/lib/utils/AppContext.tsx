"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getSession } from "../session";
import { SessionObject } from "./types";

interface AppContextProps {
  currentIdPage: any;
  setCurrentIdPage: React.Dispatch<React.SetStateAction<any>>;
  session: SessionObject | null;
  loading: boolean;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentIdPage, setCurrentIdPage] = useState(0);
  const [session, setSession] = useState<SessionObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      const fetchSession = async() => {

        const session = await getSession();

        if (session) {
          console.log("AppContext", session);
          setSession({
            email: session.user.email,
            name: session.user.nom,
            role: session.user.role,
          });
        }
        setLoading(false);
      };

      fetchSession();
    }
  });

  return (
    <AppContext.Provider value={{ currentIdPage, setCurrentIdPage, session, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  (AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};