import "../styles/card.css";

export function Card({ pokemon, onClick }) {
  const { id, name, type, image } = pokemon;

  const classes = `card ${type !== "unknown" ? `type-${type}` : ""}`;
  return (
    <button className={classes} onClick={() => onClick(id)}>
      {/* Only render <img> when the image URL is available to avoid empty src warning */}
      {image && <img src={image} alt={name} height={100} width={115} />}
      <p>{name}</p>
    </button>
  );
}
