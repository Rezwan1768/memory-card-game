import { useState } from "react";
import { DifficultyControl } from "./DifficultyControl";
import { ScoreBoard } from "./ScoreBoard";
import "../styles/app.css";
import { CardGrid } from "./CardGrid";
import { shuffle } from "../utils/shuffle";

function App() {
  const [shuffledPokemon, setShuffledPokemon] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [refreshKey, setRefreshKey] = useState(0);
  const [score, setScore] = useState(0);

  function onShuffle() {
    setShuffledPokemon((prev) => shuffle(prev));
  }

  function onDifficultyChange(e) {
    setDifficulty(e.target.value);
    setScore(0);
  }

  function onRefresh() {
    setRefreshKey(refreshKey + 1);
    setScore(0);
  }

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <div className="controls-wrapper">
        <DifficultyControl onChange={onDifficultyChange} value={difficulty} />
        <button type="button" className="control-btn" onClick={onShuffle}>
          Shuffle
        </button>
        <button type="button" className="control-btn" onClick={onRefresh}>
          New
        </button>
        <ScoreBoard score={score} />
      </div>
      <CardGrid
        shuffledPokemon={shuffledPokemon}
        setShuffledPokemon={setShuffledPokemon}
        difficulty={difficulty}
        refreshKey={refreshKey}
        setScore={setScore}
      />
    </>
  );
}

export default App;
