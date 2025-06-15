import { useState, useEffect } from "react";
import { Card } from "./Card";
import "../styles/cardGrid.css";

export function CardGrid() {
  const [pokemonData, setPokemonData] = useState([]);
  console.log(pokemonData);
  useEffect(() => {
    async function fetchData() {
      const baseURL = "https://pokeapi.co/api/v2/pokemon";
      const result = [];
      try {
        for (let i = 1; i < 20; ++i) {
          const url = `${baseURL}/${i}`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          const formattedData = formatPokemonData(data);

          // Prevent adding duplicate pokemon
          if (!result.some((pokemon) => pokemon.id === formattedData.id))
            result.push(formattedData);
        }
        setPokemonData(result);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="card-grid">
      {pokemonData.length !== 0 &&
        pokemonData.map((pokemon) => {
          return <Card key={pokemon.id} pokemon={pokemon} />;
        })}
    </div>
  );
}

function formatPokemonData(data) {
  const rawName = data.name.trim();
  const name = rawName[0].toUpperCase() + rawName.slice(1);
  // Some image versions might be missing, used fallbacks in order of preference
  const image =
    data.sprites?.other?.dream_world?.front_default ||
    data.sprites?.other?.["official-artwork"]?.front_default ||
    data.sprites?.front_default ||
    "";
  const type = data.types?.[0]?.type.name.trim() || "unknown";

  return {
    id: data.id,
    name,
    type,
    image,
  };
}
