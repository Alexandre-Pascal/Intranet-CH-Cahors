/* 
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
*/

//teste cela

import generateTitleId from "../app/lib/utils/generateId";    

describe("generateTitleId", () => {
    it("should return a title id", () => {
        const title = "This is a title";
        const titleId = generateTitleId(title);
        expect(titleId).toBe("this-is-a-title");
    });
    
    it("should return a temporary title id", () => {
        const titleId = generateTitleId();
        expect(titleId).toBeGreaterThan(0);
    });
    
    it("should return a title id without special characters", () => {
        const title = "This is a title with special characters: é, à, ç, ï";
        const titleId = generateTitleId(title);
        expect(titleId).toBe("this-is-a-title-with-special-characters-e-a-c-i");
    });
    
    it("should return a title id without spaces", () => {
        const title = "This is a title with spaces";
        const titleId = generateTitleId(title);
        expect(titleId).toBe("this-is-a-title-with-spaces");
    });
    
    it("should return a title id without apostrophes", () => {
        const title = "This is a title with apostrophes: it's";
        const titleId = generateTitleId(title);
        expect(titleId).toBe("this-is-a-title-with-apostrophes-it-s");
    });
    
    it("should return a title id without diacritics", () => {
        const title = "This is a title with diacritics: é, à, ç, ï";
        const titleId = generateTitleId(title);
        expect(titleId).toBe("this-is-a-title-with-diacritics-e-a-c-i");
    });
    
    it("should return a title id without special characters, spaces, apostrophes, and diacritics", () => {
        const title = "This is a title with special characters: é, à, ç, ï, spaces, apostrophes: it's";
        const titleId = generateTitleId(title);
        expect(titleId).toBe("this-is-a-title-with-special-characters-e-a-c-i-spaces-apostrophes-it-s");
    });

    it("should return a title id with a random number", () => {
        const title = "This is a title";
        const titleId = generateTitleId(title);
        expect(titleId).toMatch(/this-is-a-title/);
    });



}  
);