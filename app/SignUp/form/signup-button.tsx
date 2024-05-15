// app/ui/signup-button.tsx

export function SignupButton({ pending }: { pending: boolean }) {
  return (
    <button aria-disabled={pending} type="submit">
      {pending ? "Submitting..." : "S'enregistrer"}
    </button>
  );
}
