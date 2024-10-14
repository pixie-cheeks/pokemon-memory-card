import './menu-screen.css';

function MenuScreen({ startGame }) {
  return (
    <div className="menu">
      <div className="text">The menu screen.</div>
      <button type="button" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}

export { MenuScreen };
