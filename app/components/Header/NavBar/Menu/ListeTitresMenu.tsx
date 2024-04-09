import { useState, useEffect } from "react";

export default function ListeTitres({ titles }: { titles: string[] }) {
  const [loadedTitles, setLoadedTitles] = useState<string[]>([]);

  useEffect(() => {
    // Mettre à jour les titres chargés avec les titres reçus en props
    setLoadedTitles(titles);
  }, [titles]); // Rafraîchir les titres chargés lorsque les titres en props changent

  return (
    <div>
      <h1>Menu</h1>
      <div>
        {loadedTitles.map((title, index) => (
          <h1 key={index}>{title}</h1>
        ))}
      </div>
    </div>
  );
}
