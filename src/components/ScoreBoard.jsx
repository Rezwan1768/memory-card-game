import { useEffect } from "react";
import { useState } from "react";

export function ScoreBoard({ score }) {
  const [bestScore, setBestScore] = useState(() => {
    const savedScore = localStorage.getItem("bestScore");
    return savedScore ? Number(savedScore) : 0;
  });

  // Update bestScore when score changes
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  // Save to localStorage when bestScore changes
  useEffect(() => {
    localStorage.setItem("bestScore", bestScore.toString());
  }, [bestScore]);

  return (
    <div className="score-container">
      <p>Best Score: {bestScore}</p>
      <p>Score: {score}</p>
    </div>
  );
}
