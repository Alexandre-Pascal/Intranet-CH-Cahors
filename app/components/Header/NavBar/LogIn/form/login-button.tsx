// app/ui/signup-button.tsx

export function LogInButton({ pending }: { pending: boolean }) {
  return (
    <button aria-disabled={pending} type="submit">
      {pending ? "Submitting..." : "Se connecter"}
    </button>
  );
}
