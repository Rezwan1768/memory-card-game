import { useState, useEffect } from "react";
import "../styles/card.css";

export function Card() {
  const [pokemonInfo, setPokemonInfo] = useState({ name: "", image: "" });
  const URL = "https://pokeapi.co/api/v2/pokemon/1025";

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
        console.log(data);
      });
  }, []);

  const types = [
    "normal",
    "fighting",
    "fire",
    "ice",
    "water",
    "flying",
    "dragon",
    "bug",
    "grass",
    "rock",
    "ground",
    "steel",
    "psychic",
    "fairy",
    "electric",
    "ghost",
    "poison",
    "dark",
    "default",
  ];
  return (
    <div className="container">
      {/* Testing out different backgrounds for the cards, 
     thinking of having a different background for each type  */}
      {types.map((element, index) => {
        const classes = "card type-" + element;
        return (
          <div className={classes} key={index}>
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
      })}
    </div>
  );
}
