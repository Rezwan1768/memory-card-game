import { useRandomPokemon } from "../hooks/useRandomPokemon";
import { Card } from "./Card";
import "../styles/cardGrid.css";

const difficultyMap = {
  easy: 14,
  medium: 20,
  hard: 28,
  hell: 40,
};

export function CardGrid({ difficulty, refreshKey }) {
  const fetchCount = difficultyMap[difficulty];
  const { pokemonData, error } = useRandomPokemon(fetchCount, refreshKey);

  if (error) return <div>{error}</div>;

  if (pokemonData.length === 0) return <div className="spinner"></div>;

  return (
    <div className="card-grid">
      {pokemonData.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
