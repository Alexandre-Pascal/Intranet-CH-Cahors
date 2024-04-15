import React, { useState } from "react";
import styles from "./styles.module.css";
import { kindOfDatas, kindOfDialog } from "@/app/utils/types";
export default function SubmitUpdateContainer(dialogType : kindOfDialog, datasType : kindOfDatas, title : string, functionToCall : any) {

  const [isDialogShown, setisDialogShown] = useState(false);
  const [newName, setnewName] = useState("");
  const [newOrder, setOrder] = useState(0);
  const [newUrl, setNewUrl] = useState("");

  switch (dialogType) {
  case "Ajouter":
    var dialogButton = "Ajouter";
    break;
  case "Modifier":
    var dialogButton = "Modifier";
    break;
  case "Supprimer":
    var dialogButton = "Confirmer";
    break;
  }

  return (
    <div>
      {isDialogShown && (
        <div className={styles.container_dialog}>
          <div className={styles.dialog}>
            <h2>{title}</h2>
            <form onSubmit={functionToCall}>
              <div className={styles.container_input}>
                <h3>Nom : </h3>
                <input
                  type="text"
                  placeholder="Veuillez renseigner ce champ"
                  value={newName}
                  onChange={(e) => setnewName(e.target.value)}
                />
                <h3>Ordre : </h3>
                <input
                  type="number"
                  placeholder="Veuillez renseigner ce champ"
                  value={newOrder}
                  onChange={(e) => setOrder(parseInt(e.target.value))}
                />
                {datasType === ("Title" || "SubCategory" && (
                  <>
                    <h3>URL : </h3>
                    <input
                      type="text"
                      placeholder="Champ non obligatoire"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                    />
                  </>
                ))
                }
              </div>
              <div className={styles.container_buttons}>
                <button onClick={() => setisDialogShown(false)}>Annuler</button>
                <button type="submit">{dialogButton}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
}