export function ScoreBoard({ score }) {
  return (
    <div className="score-container">
      <p>Best Score: {score}</p>
      <p>Score: {score}</p>
    </div>
  );
}
