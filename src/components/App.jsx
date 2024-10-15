import { useState } from 'react';
import { Game } from './Game/Game.jsx';
import { MenuScreen } from './MenuScreen/MenuScreen.jsx';

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

  if (isGameStarted)
    return <Game {...{ setCurrentScore, currentScore, quitGame, highScore }} />;

  return <MenuScreen startGame={startGame} />;
}

export { App };
