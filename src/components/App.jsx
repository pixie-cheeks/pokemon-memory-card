import { useState } from 'react';
import { Game } from './Game/Game.jsx';

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
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem('highScore')) ?? 0,
  );

  if (currentScore > highScore) {
    localStorage.setItem('highScore', currentScore);
    setHighScore(currentScore);
  }
  return (
    <>
      <header className="header">
        <h1 className="page__title">Pokémon: Memory Card</h1>
        <Scoreboard {...{ currentScore, highScore }} />
      </header>
      <Game {...{ setCurrentScore, currentScore }} />
    </>
  );
}

export { App };
