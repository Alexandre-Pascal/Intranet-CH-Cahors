export default function generateTitleId(title? :any) {
  if (!title) {
    const temporaryTitle = generateRandomNumber();
    return temporaryTitle;
  }
  else{
    const sanitizedTitle = title
      .toLowerCase() // Convertir en minuscules
      .replace(/'/g, "-") // Remplacer les apostrophes par des tirets
      .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
      .normalize("NFD") // Normaliser les caractères accentués en caractères de base
      .replace(/[\u0300-\u036f]/g, ""); // Supprimer les caractères diacritiques
    const titleKey = sanitizedTitle.replace(/[^a-z0-9_-]/g, ""); // Filtrer les caractères non valides
    return titleKey;
  }
}

function generateRandomNumber(): number {
  const min = 1; // Plus petit nombre de 9 chiffres (100000000)
  const max = 999999999; // Plus grand nombre de 9 chiffres (999999999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}