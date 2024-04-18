import React from "react";
import styles from "./styles.module.css";
import { dataObject } from "@/app/lib/utils/types";
import { submitItem, deleteItem, updateItem } from "../itemFunctions";
import { ADD, UPDATE, DELETE } from "@/app/lib/utils/constantes";

export default function SubmitUpdateDeleteContainer(datas : dataObject) {

  var dialogButton = "";

  switch (datas.dialogType) {
  case ADD:
    var dialogButton = "Ajouter";
    break;
  case UPDATE:
    var dialogButton = "Modifier";
    break;
  case DELETE:
    var dialogButton = "Confirmer";
    break;
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (datas.dialogType) {
    case ADD:
      submitItem(datas);
      break;
    case UPDATE:
      updateItem(datas);
      break;
    case DELETE:
      deleteItem(datas);
      break;
    }
    datas.setDoing({ itemType: "None", dialogType: "None" });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    datas.setDoing({ itemType: "None", dialogType: "None" });
    datas.setName ? datas.setName("") : "";
    datas.setOrder ? datas.setOrder(0) : "";
    datas.setUrl ? datas.setUrl("") : "";
  };

  return (
    <div className={styles.container_dialog}>
      <div className={styles.dialog}>
        <h2>{datas.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.container_input}>
            {datas.dialogType !== DELETE && (
              <>
                <h3>Nom : </h3>
                <input
                  type="text"
                  placeholder="Veuillez renseigner ce champ"
                  value={datas.name}
                  onChange={(e) => datas.setName ? datas.setName(e.target.value) : ""}
                />
                <h3>Ordre : </h3>
                <input
                  type="number"
                  placeholder="Veuillez renseigner ce champ"
                  value={datas.order}
                  onChange={(e) => datas.setOrder ? datas.setOrder(parseInt(e.target.value)) : ""}
                />
                {(datas.datasType == "Title" || datas.datasType == "SubCategory") && (
                  <>
                    <h3>URL : </h3>
                    <input
                      type="text"
                      placeholder="Champ non obligatoire"
                      value={datas.url}
                      onChange={(e) =>datas.setUrl ? datas.setUrl(e.target.value) : ""}
                    />
                  </>
                )
                }
              </>
            )}
          </div>
          <div className={styles.container_buttons}>
            <button onClick={handleCancel}>Annuler</button>
            <button type="submit">{dialogButton}</button>
          </div>
        </form>
      </div>
    </div>
  );
}