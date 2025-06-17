import { useState, useEffect } from "react";
import { Card } from "./Card";
import "../styles/cardGrid.css";

export function CardGrid() {
  const [pokemonCount, setPokemonCount] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  console.log(pokemonCount);
  console.log(pokemonData);
  /*
   * Get the total number of Pokémon in the database so we can fetch a random set
   * instead of always using the same ones.
   */
  useEffect(() => {
    const pokemonCountURL = "https://pokeapi.co/api/v2/pokemon-species?limit=1";
    async function fetchPokemonCount() {
      const response = await fetch(pokemonCountURL);
      const pokemonListData = await response.json();
      setPokemonCount(pokemonListData.count);
    }
    fetchPokemonCount();
  }, []);

  useEffect(() => {
    async function fetchPokemonData() {
      const pokemonBaseURL = "https://pokeapi.co/api/v2/pokemon";
      const pokemonList = [];
      try {
        for (let i = 1; i < 20; ++i) {
          const pokemonUrl = `${pokemonBaseURL}/${i}`;
          const response = await fetch(pokemonUrl);
          const data = await response.json();
          const formattedData = formatPokemonData(data);

          // Prevent adding duplicate pokemon
          if (!pokemonList.some((pokemon) => pokemon.id === formattedData.id))
            pokemonList.push(formattedData);
        }
        setPokemonData(pokemonList);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPokemonData();
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
