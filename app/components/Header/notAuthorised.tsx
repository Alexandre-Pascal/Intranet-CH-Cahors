"use client";
export default function notAuthorised(){
  alert("Vous n'êtes pas autorisé à accéder à cette page, vous allez être redirigé");
  window.location.href = "/";
}