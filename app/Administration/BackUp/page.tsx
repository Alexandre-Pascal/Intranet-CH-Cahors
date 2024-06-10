"use client";

import { Icon } from "@/app/lib/utils/Icon";
import styles from "./styles.module.css";

export default function Page() {
  return (
    <div className={styles.backup_container}>
      <h1>BackUp</h1>
      <div>
        <h2>Cliquez sur le bouton ci-dessous pour générer une sauvegarde de la base de données</h2>
        <button
          onClick={() => backupBD()}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
            BackUp
        </button>
      </div>
      <div>
        <h2>Téléchargez une backup au préalablement générées</h2>
        <ul>
          <li>Backup du 2024-06-11<a><Icon name="Download" /></a></li>
          <li>Backup du 2024-06-10<a><Icon name="Download" /></a></li>
          <li>Backup du 2024-06-10<a><Icon name="Download" /></a></li>
        </ul>
      </div>
      <div>
        <h2>Cliquez sur le bouton ci-dessous pour sélectionner un ficher à restaurer</h2>
        <input type="file" id="file" name="file" accept=".sql" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Valider</button>
      </div>
    </div>
  );
}

function backupBD() {
  const requestOptions = {
    method: "GET",
  };
  fetch("/api/backup", requestOptions);
}

function restoreBD() {
  const requestOptions = {
    method: "GET",
  };
  fetch("/api/restore", requestOptions);
}