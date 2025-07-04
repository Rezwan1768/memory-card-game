import { useState, useEffect } from "react";

export function useRandomPokemon(fetchCount = 14, refreshKey) {
  const [pokemonCount, setPokemonCount] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);

  /*
   * Get the total number of Pokémon in the database so we can fetch a random set
   * instead of always using the same ones.
   */
  useEffect(() => {
    const pokemonCountURL = "https://pokeapi.co/api/v2/pokemon-species?limit=1";
    async function fetchPokemonCount() {
      try {
        const response = await fetch(pokemonCountURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokémon count: ${response.status}`);
        }
        const pokemonListData = await response.json();
        setPokemonCount(pokemonListData.count);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchPokemonCount();
  }, []);

  useEffect(() => {
    if (pokemonCount <= 0 || error) return;
    setPokemonData([]); // To show load spinner on refresh
    let ignore = false;

    // Generate and store unique pokemon ids to fetch
    const pokemonIdSet = new Set();
    while (pokemonIdSet.size < fetchCount) {
      const randomId = Math.floor(Math.random() * pokemonCount) + 1;
      if (!pokemonIdSet.has(randomId)) pokemonIdSet.add(randomId);
    }

    const pokemonBaseURL = "https://pokeapi.co/api/v2/pokemon";

    // Handle all Pokémon fetches at once using Promise.allSettled
    const promises = Array.from(pokemonIdSet).map(async (pokemonId) => {
      const pokemonUrl = `${pokemonBaseURL}/${pokemonId}`;
      const response = await fetch(pokemonUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Pokémon with id ${pokemonId}: ${response.status}`,
        );
      }
      const rawPokemonData = await response.json();
      return formatPokemonData(rawPokemonData);
    });

    Promise.allSettled(promises).then((results) => {
      if (ignore) return; // prevent stale state update

      /*
       * Store all data first in a temporary array. Update state once all data
       * is collected to minimize renders.
       */
      const pokemonList = [];
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          pokemonList.push(result.value);
        }
      });
      if (pokemonList.length === 0) {
        setError("Failed to fetch any pokemon.");
      } else {
        setPokemonData(pokemonList);
      }
    });
    return () => (ignore = true);
  }, [pokemonCount, fetchCount, refreshKey]);

  return { pokemonData, error };
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
