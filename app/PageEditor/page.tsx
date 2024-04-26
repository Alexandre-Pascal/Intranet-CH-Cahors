"use client";

import React from "react";
import TextEditor from "./Editor/TextEditor";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MakerUpdater() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("CreateOrUpdate") || "";
  const idPage = searchParams.get("idPage") || "";

  return (
    <div>
        <h1 className="ml-10">{mode === "create" ? "Création de page" : `Modification de ${idPage}`}</h1>
        <TextEditor kind={mode} idPage={idPage} />
      </div>
  )
}

export function PageMakerUpdater() {
  return (
    <Suspense>
      <MakerUpdater/>
    </Suspense>
  );
}

