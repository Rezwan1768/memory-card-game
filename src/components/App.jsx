import { useState } from "react";
import { DifficultyControl } from "./DifficultyControl";
import { ScoreBoard } from "./ScoreBoard";
import "../styles/app.css";
import { CardGrid } from "./CardGrid";

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [refreshKey, setRefreshKey] = useState(0);

  function onDifficultyChange(e) {
    setDifficulty(e.target.value);
    console.log(e.target.value);
  }

  function onRefresh() {
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <div className="controls-wrapper">
        <DifficultyControl onChange={onDifficultyChange} value={difficulty} />
        <button type="button" className="refresh-btn" onClick={onRefresh}>
          Refresh
        </button>
        <ScoreBoard />
      </div>
      <CardGrid difficulty={difficulty} refreshKey={refreshKey} />;
    </>
  );
}

export default App;
