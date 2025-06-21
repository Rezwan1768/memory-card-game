import { DifficultyControl } from "./DifficultyControl";
import { ScoreBoard } from "./ScoreBoard";
import "../styles/app.css";
import { CardGrid } from "./CardGrid";

function App() {
  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <div className="controls-wrapper">
        <DifficultyControl />
        <button type="button" className="refresh-btn">
          Refresh
        </button>
        <ScoreBoard />
      </div>
      <CardGrid />;
    </>
  );
}

export default App;
