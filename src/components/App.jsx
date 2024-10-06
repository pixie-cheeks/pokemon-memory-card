// import { useState, useEffect } from 'react';
import Game from './Game/Game.jsx';

function Scoreboard() {
  return (
    <div className="scoreboard">
      <div className="scoreboard__score">
        <div className="scoreboard__name">Score:</div>
        <div className="scoreboard__count">0</div>
      </div>
      <div className="scoreboard__score">
        <div className="scoreboard__name">High Score:</div>
        <div className="scoreboard__count">0</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <header className="header">
        <h1 className="page__title">Pokémon: Memory Card</h1>
        <Scoreboard />
      </header>
      <Game />
    </>
  );
}

export default App;
