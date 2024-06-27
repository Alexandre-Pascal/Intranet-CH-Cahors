// Bouton utilisé dans la page d'inscription

export function SignupButton({ pending }: { pending: boolean }) {
  return (
    <button aria-disabled={pending} type="submit">
      {pending ? "En cours..." : "S'enregistrer"}
    </button>
  );
}
