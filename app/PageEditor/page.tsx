"use client";

import React from "react";
import TextEditor from "./Editor/TextEditor";
import { useSearchParams } from "next/navigation";

export default function PageMakerUpdater() {

  const searchParams = useSearchParams();
  let mode;
  let idPage;
  mode = searchParams.get("CreateOrUpdate") || "";
  idPage = searchParams.get("idPage") || "";

  return (
    <div>
      <h1 className="ml-10">{mode === "create" ? "Création de page" : `Modification de ${idPage}`}</h1>
      <TextEditor kind={mode} idPage={idPage} />
    </div>
  );
}

