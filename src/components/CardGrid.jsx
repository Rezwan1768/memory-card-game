import { useState, useEffect } from "react";
import { useRandomPokemon } from "../hooks/useRandomPokemon";
import "../styles/cardGrid.css";
import { Card } from "./Card";

const difficultyMap = {
  easy: 14,
  medium: 20,
  hard: 28,
  hell: 40,
};

export function CardGrid({ difficulty, refreshKey, setScore }) {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(new Set());
  const fetchCount = difficultyMap[difficulty];
  const { pokemonData, error } = useRandomPokemon(fetchCount, refreshKey);

  const [shuffledPokemon, setShuffledPokemon] = useState([]);

  // Update shuffledPokemon when new pokemonData is fetched
  useEffect(() => {
    if (pokemonData.length > 0) {
      setShuffledPokemon(pokemonData);
    }
  }, [pokemonData]);

  function onCardClick(pokemonId) {
    if (selectedPokemonIds.has(pokemonId)) {
      setSelectedPokemonIds(new Set());
      setScore(0);
    } else {
      setSelectedPokemonIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(pokemonId);
        return newSet;
      });
      setScore((score) => score + 1);
    }
    setShuffledPokemon(shuffle(pokemonData));
  }

  if (error) return <div>{error}</div>;

  if (shuffledPokemon.length === 0) return <div className="spinner"></div>;

  return (
    <div className="card-grid">
      {shuffledPokemon.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
      ))}
    </div>
  );
}

function shuffle(array) {
  const arrayCopy = array.slice();
  let lastIndex = arrayCopy.length;
  while (lastIndex > 0) {
    const randomIndex = Math.floor(Math.random() * lastIndex);
    lastIndex--;

    // Swap the values by destructuring
    [arrayCopy[lastIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[lastIndex],
    ];
  }
  return arrayCopy;
}
