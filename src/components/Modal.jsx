import "../styles/modal.css";

export function Modal({ onClick }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>Great job! You caught them all!</p>
        <button type="button" onClick={onClick}>
          New Game
        </button>
      </div>
    </div>
  );
}
