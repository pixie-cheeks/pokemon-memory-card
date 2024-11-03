import { useState } from 'react';
import { GameHead } from '../GameHead/GameHead.jsx';
import { GameDialog } from '../GameDialog/GameDialog.jsx';
import './game.css';

function GameCard({ sprite, name, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="game__card card"
      onClick={onClick}
      onKeyDown={({ key }) => key === 'Enter' && onClick()}
    >
      <div className="card__img-container">
        <img src={sprite} alt={name} className="img card__img" />
      </div>
      <div className="card__name">{name}</div>
    </div>
  );
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

async function fetchPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();
  const pokemonList = await Promise.all(
    data.results.map(async ({ url }) => {
      const responseInner = await fetch(url);
      const dataInner = await responseInner.json();
      return {
        id: dataInner.order,
        name: dataInner.name,
        sprite:
          dataInner.sprites.versions['generation-i']['red-blue']
            .front_transparent,
      };
    }),
  );

  return pokemonList;
}

const setSeen = (array, seenStatus) =>
  array.map((element) => ({ ...element, seen: seenStatus }));

const lsFetchedPokemon = localStorage.getItem('fetchedPokemon');
const fetchedPokemon = lsFetchedPokemon
  ? JSON.parse(lsFetchedPokemon)
  : await fetchPokemon();
if (!lsFetchedPokemon)
  localStorage.setItem('fetchedPokemon', JSON.stringify(fetchedPokemon));

let newGamePokemon = setSeen(fetchedPokemon, false);
let unseenPokemon = newGamePokemon.length - 15;

function Game({ setCurrentScore, currentScore, quitGame, highScore }) {
  const [pokemonCardList, setPokemonCardList] = useState(() =>
    getRandomPokemon(newGamePokemon),
  );
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [roundScore, setRoundScore] = useState(0);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const maxScore = pokemonCardList.length;

  const resetRound = () => {
    setClickedPokemon([]);
    setRoundScore(0);
  };

  const continueGame = () => {
    if (unseenPokemon === 16) {
      unseenPokemon -= 16;
      setPokemonCardList(getRandomPokemon(newGamePokemon, 16));
    } else {
      unseenPokemon -= 15;
      setPokemonCardList(getRandomPokemon(newGamePokemon));
    }
    setIsGameWon(false);
    resetRound();
  };

  const resetGame = () => {
    newGamePokemon = setSeen(newGamePokemon, false);
    unseenPokemon = newGamePokemon.length - 15;
    setPokemonCardList(() => getRandomPokemon(newGamePokemon));
    setCurrentScore(0);
    if (isGameLost) setIsGameLost(false);
    if (isGameWon) setIsGameWon(false);
    if (isGameCompleted) setIsGameCompleted(false);
    resetRound();
  };

  const exitGame = () => {
    resetGame();
    quitGame();
  };

  const onClick = (clickedId) => {
    if (isGameWon || isGameLost || isGameCompleted) return;

    if (clickedPokemon.includes(clickedId)) {
      setIsGameLost(true);
      return;
    }
    setClickedPokemon([...clickedPokemon, clickedId]);
    setCurrentScore(currentScore + 1);
    setRoundScore(roundScore + 1);
    // Because it doesn't update until the next render
    if (clickedPokemon.length + 1 === pokemonCardList.length) {
      // if (clickedPokemon.length + 1 === 1) {
      if (unseenPokemon === 0) {
        setIsGameCompleted(true);
      } else {
        setIsGameWon(true);
      }
      return;
    }
    setPokemonCardList(shuffleArray(pokemonCardList));
  };

  const pokemonCards = pokemonCardList.map(({ sprite, name, id }) => (
    <GameCard {...{ sprite, name }} onClick={() => onClick(id)} key={id} />
  ));

  return (
    <div className="game">
      <div className="container">
        <GameHead {...{ currentScore, highScore, exitGame }} />
        <h2 className="game__card-count">
          {roundScore}/{maxScore}
        </h2>
        <div className="game__cards-container">{pokemonCards}</div>
        <GameDialog
          {...{
            isGameCompleted,
            isGameLost,
            isGameWon,
            currentScore,
            resetGame,
            exitGame,
            continueGame,
          }}
        />
      </div>
    </div>
  );
}

export { Game };
