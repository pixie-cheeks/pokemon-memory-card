import './menu-screen.css';

function MenuScreen({ startGame }) {
  return (
    <div className="menu">
      <div className="menu__wrapper">
        <div className="menu__title">
          <div className="menu__main-title">Pokémon</div>
          <div className="menu__subtitle">Memory Card</div>
        </div>
        <button
          type="button"
          className="menu__button button"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export { MenuScreen };
