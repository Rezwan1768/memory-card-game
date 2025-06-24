import { useState } from "react";
import { DifficultyControl } from "./DifficultyControl";
import { ScoreBoard } from "./ScoreBoard";
import "../styles/app.css";
import { CardGrid } from "./CardGrid";
import { shuffle } from "../utils/shuffle";
import { Modal } from "./Modal";

function App() {
  const [shuffledPokemon, setShuffledPokemon] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [resetKey, setResetKey] = useState(0);
  const [score, setScore] = useState(0);

  const hasPlayerWon =
    shuffledPokemon.length > 0 && score === shuffledPokemon.length;

  function onShuffle() {
    setShuffledPokemon((prev) => shuffle(prev));
  }

  function onDifficultyChange(e) {
    setDifficulty(e.target.value);
    setScore(0);
  }

  function onReset() {
    setResetKey(resetKey + 1);
    setScore(0);
  }

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <div className="game-header">
        <div className="controls-wrapper">
          <button
            type="button"
            className="control-btn"
            onClick={onShuffle}
            disabled={shuffledPokemon.length === 0}
          >
            Shuffle
          </button>

          <button
            type="button"
            className="control-btn"
            onClick={onReset}
            disabled={shuffledPokemon.length === 0}
          >
            New
          </button>

          <DifficultyControl onChange={onDifficultyChange} value={difficulty} />
        </div>
        <ScoreBoard score={score} />
      </div>

      <CardGrid
        shuffledPokemon={shuffledPokemon}
        setShuffledPokemon={setShuffledPokemon}
        difficulty={difficulty}
        resetKey={resetKey}
        setScore={setScore}
      />

      {hasPlayerWon && <Modal onClick={onReset} />}
    </>
  );
}

export default App;
