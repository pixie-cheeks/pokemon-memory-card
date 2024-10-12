import { useState } from 'react';
import allPokemon from './game-data.json';

function GameCard({ sprite, name, onClick }) {
  return (
    <button type="button" className="game__card card" onClick={onClick}>
      <div className="card__img-container">
        <img src={sprite} alt={name} className="img card__img" />
      </div>
      <div className="card__name">{name}</div>
    </button>
  );
}

function GameLostModal({ currentScore, resetGame }) {
  return (
    <div className="modal">
      <div className="modal__title">Game Over!</div>
      <img src="#" alt="#" className="modal__img" />
      <div className="modal__text">Your final score is {currentScore}</div>
      <div className="modal__actions">
        <button
          type="button"
          className="button modal__button"
          onClick={resetGame}
        >
          Play again
        </button>
        <button type="button" className="button modal__button">
          Quit
        </button>
      </div>
    </div>
  );
}

function GameWonModal() {
  return <div className="modal" />;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray(array) {
  const arrayCopy = [...array];
  for (let index = arrayCopy.length - 1; index >= 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [arrayCopy[index], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[index],
    ];
  }
  return arrayCopy;
}

function getRandomPokemon(pokemonList, maxPokemon = 15) {
  const unseenPokemon = pokemonList.filter(({ seen }) => !seen);
  const randomPokemonArray = [];

  for (let index = 0; index < maxPokemon; index++) {
    const [randomPokemon] = unseenPokemon.splice(
      getRandomInt(0, unseenPokemon.length - 1),
      1,
    );
    randomPokemon.seen = true;
    randomPokemonArray.push(randomPokemon);
  }

  return randomPokemonArray;
}

const setSeen = (array, seenStatus) =>
  array.map((element) => ({ ...element, seen: seenStatus }));

let newGamePokemon = setSeen(allPokemon, false);
let unseenPokemon = newGamePokemon.length - 15;
const initialPokemonCardList = getRandomPokemon(newGamePokemon);

function Game({ setCurrentScore, currentScore }) {
  const [pokemonCardList, setPokemonCardList] = useState(
    initialPokemonCardList,
  );
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [roundScore, setRoundScore] = useState(0);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const continueGame = () => {
    if (unseenPokemon === 16) {
      unseenPokemon -= 16;
      setPokemonCardList(getRandomPokemon(newGamePokemon, 16));
    } else {
      unseenPokemon -= 15;
      setPokemonCardList(getRandomPokemon(newGamePokemon));
    }
    setClickedPokemon([]);
    setCurrentScore(0);
  };

  const resetGame = () => {
    newGamePokemon = setSeen(newGamePokemon, false);
    setPokemonCardList(getRandomPokemon(newGamePokemon));
    setClickedPokemon([]);
    setCurrentScore(0);
    if (isGameLost) setIsGameLost(false);
    if (isGameWon) setIsGameWon(false);
  };

  const onClick = (clickedId) => {
    if (isGameWon || isGameLost) return;

    if (clickedPokemon.includes(clickedId)) {
      setIsGameLost(true);
      return;
    }
    setClickedPokemon([...clickedPokemon, clickedId]);
    setCurrentScore(currentScore + 1);
    setRoundScore(roundScore + 1);
    if (clickedPokemon.length === pokemonCardList.length) {
      setIsGameWon(true);
      return;
    }
    setPokemonCardList(shuffleArray(pokemonCardList));
  };

  const pokemonCards = pokemonCardList.map(({ sprite, name, id }) => (
    <GameCard {...{ sprite, name }} onClick={() => onClick(id)} key={id} />
  ));

  return (
    <div className="game">
      <h2 className="game__card-count">{roundScore}/15</h2>
      <div className="game__cards-container">{pokemonCards}</div>
      {isGameLost && <GameLostModal {...{ currentScore, resetGame }} />}
      {isGameWon && <GameWonModal />}
    </div>
  );
}

export { Game };
