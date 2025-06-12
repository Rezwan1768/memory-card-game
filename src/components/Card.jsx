import { useState, useEffect } from "react";

export function Card() {
  const [pokemonInfo, setPokemonInfo] = useState({ name: "", image: "" });
  const URL = "https://pokeapi.co/api/v2/pokemon/890";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const name = data.name[0].toUpperCase() + data.name.slice(1);
        // Some image versions might be missing, used fallbacks in order of preference
        const image =
          data.sprites?.other?.dream_world?.front_default ||
          data.sprites?.other?.["official-artwork"]?.front_default ||
          data.sprites?.front_default ||
          "";

        setPokemonInfo({
          name,
          image,
        });
        console.log(data.sprites);
      });
  }, []);

  return (
    <div>
      {/* Only render <img> when the image URL is available to avoid empty src warning */}
      {pokemonInfo.image && (
        <img
          src={pokemonInfo.image}
          alt={pokemonInfo.name}
          height={200}
          width={200}
        />
      )}
      <p>{pokemonInfo.name}</p>
    </div>
  );
}
