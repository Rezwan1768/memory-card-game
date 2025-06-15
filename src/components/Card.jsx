import "../styles/card.css";

export function Card({ pokemon }) {
  const { name, type, image } = pokemon;

  const classes = `card ${type !== "unknown" ? `type-${type}` : ""}`;
  console.log(classes);
  return (
    <div className={classes}>
      {/* Only render <img> when the image URL is available to avoid empty src warning */}
      {image && <img src={image} alt={name} height={200} width={200} />}
      <p>{name}</p>
    </div>
  );
}
