import './game-head.css';

function Scoreboard({ currentScore, highScore }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__score">
        <div className="scoreboard__name">Score:</div>
        <div className="scoreboard__count">{currentScore}/151</div>
      </div>
      <div className="scoreboard__score">
        <div className="scoreboard__name">High Score:</div>
        <div className="scoreboard__count">{highScore}/151</div>
      </div>
    </div>
  );
}
function GameHead({ exitGame, currentScore, highScore }) {
  return (
    <header className="header">
      <button
        type="button"
        className="page__title game-title"
        onClick={exitGame}
      >
        <p className="game-title__main">Pokémon:</p>
        <p className="game-title__sub">Memory Card</p>
      </button>
      <Scoreboard {...{ currentScore, highScore }} />
    </header>
  );
}

export { GameHead };
