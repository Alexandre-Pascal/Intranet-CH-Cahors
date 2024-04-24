export default function generateTitleId(title :any) {
  const sanitizedTitle = title
    .toLowerCase() // Convertir en minuscules
    .replace(/'/g, "-") // Remplacer les apostrophes par des tirets
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .normalize("NFD") // Normaliser les caractères accentués en caractères de base
    .replace(/[\u0300-\u036f]/g, ""); // Supprimer les caractères diacritiques
  const titleKey = sanitizedTitle.replace(/[^a-z0-9_-]/g, ""); // Filtrer les caractères non valides
  return titleKey;
}