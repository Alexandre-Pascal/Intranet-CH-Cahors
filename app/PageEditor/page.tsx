"use client";

import React from "react";
import TextEditor from "./Editor/TextEditor";
import { useSearchParams } from "next/navigation";

export default function PageMakerUpdater() {

  const searchParams = useSearchParams();
  let mode;
  mode = searchParams.get("CreateOrUpdate") || "ezezzz";

  return (
    <div>
      <h1>{mode === "create" ? "Création de page" : "Modification de page"}</h1>
      <TextEditor kind={mode} />
    </div>
  );
}

