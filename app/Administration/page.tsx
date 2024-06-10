"use client";
import Users from "./Users/Users";
import styles from "./styles.module.css";
import { useAppContext } from "@/app/lib/utils/AppContext";
import notAuthorised from "../components/Header/notAuthorised";
import { Spinner } from "../components/ui/Spinner";
import { useEffect, useState } from "react";

export default function Administration() {
  const { session, loading } = useAppContext();
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (!loading) {
      if (session?.role == undefined || session.role !== "Administrateur") {
        notAuthorised();
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    }
  }, [loading, session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" size={3} />
      </div>
    );
  }

  if (isAuthorized === false) {
    return null;
  }

  if (isAuthorized === true) {
    return (
      <div>
        <h1 className="ml-10">Administration</h1>
        <div className={styles.container_buttons}>
          <button
            onClick={() => window.location.href = "./Administration/CreateRole?kind=create"}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
          >
            Créer un nouveau rôle
          </button>
          <button
            onClick={() => window.location.href = "./Administration/CreateRole?kind=update"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
          >
            Modifier un rôle
          </button>
          <button
            onClick={() => window.location.href = "./Administration/BackUp"}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Gérer la BD
          </button>
        </div>
        <Users />
      </div>
    );
  }

  return null; // This ensures that nothing is rendered if isAuthorized is null
}