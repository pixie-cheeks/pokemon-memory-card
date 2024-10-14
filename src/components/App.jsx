import { useState } from 'react';
import { Game } from './Game/Game.jsx';
import { MenuScreen } from './MenuScreen/MenuScreen.jsx';

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

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem('highScore')) ?? 0,
  );

  if (currentScore > highScore) {
    localStorage.setItem('highScore', currentScore);
    setHighScore(currentScore);
  }

  const startGame = () => setIsGameStarted(true);
  const quitGame = () => setIsGameStarted(false);

  if (!isGameStarted) return <MenuScreen startGame={startGame} />;

  return (
    <>
      <header className="header">
        <button
          type="button"
          className="page__title game-title"
          onClick={quitGame}
        >
          Pokémon: Memory Card
        </button>
        <Scoreboard {...{ currentScore, highScore }} />
      </header>
      <Game {...{ setCurrentScore, currentScore, quitGame, isGameStarted }} />
    </>
  );
}

export { App };
