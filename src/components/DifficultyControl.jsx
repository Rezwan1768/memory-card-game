export function DifficultyControl() {
  return (
    <div>
      <label htmlFor="difficulty-select">Difficulty:</label>
      <select id="difficulty-select" name="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="hell">Hell</option>
      </select>
    </div>
  );
}
