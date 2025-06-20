import { useRandomPokemon } from "../hooks/useRandomPokemon";
import { Card } from "./Card";
import "../styles/cardGrid.css";

export function CardGrid() {
  const { pokemonData, error } = useRandomPokemon();

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
