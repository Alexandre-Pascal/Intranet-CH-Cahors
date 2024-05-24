"use client";
import Users from "./Users/Users";
import styles from "./styles.module.css";
export default function Administration() {

  return (
    <div>
      <h1 className="ml-10">Administration</h1>
      <div className={styles.container_buttons}>
        <button onClick={() => window.location.href = "./Administration/CreateRole?kind=create"} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4">Créer un nouveau rôle</button>
        <button onClick={() => window.location.href = "./Administration/CreateRole?kind=update"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4">Modifier un rôle</button>
      </div>
      <Users/>
    </div>
  );
}