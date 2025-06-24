import { useState, useEffect } from "react";
import { useRandomPokemon } from "../hooks/useRandomPokemon";
import { shuffle } from "../utils/shuffle";
import "../styles/cardGrid.css";
import { Card } from "./Card";

const difficultyMap = {
  easy: 14,
  medium: 20,
  hard: 28,
  hell: 40,
};

export function CardGrid({
  shuffledPokemon,
  setShuffledPokemon,
  difficulty,
  resetKey,
  setScore,
}) {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState(new Set());
  const fetchCount = difficultyMap[difficulty];
  const { pokemonData, error } = useRandomPokemon(fetchCount, resetKey);

  // Update shuffledPokemon when new pokemonData is fetched
  useEffect(() => {
    if (pokemonData.length > 0) {
      setShuffledPokemon(pokemonData);
    }
  }, [pokemonData, setShuffledPokemon]);

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
    setShuffledPokemon(shuffle(shuffledPokemon));
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
