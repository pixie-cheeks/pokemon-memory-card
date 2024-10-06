import { useState } from 'react';
import pokemons from './game-data.json';

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
  const randomPokemon = [];

  for (let index = 0; index < maxPokemon; index++) {
    randomPokemon.push(
      ...unseenPokemon.splice(getRandomInt(0, unseenPokemon.length - 1), 1),
    );
  }

  return randomPokemon;
}

const initialPokemons = pokemons.map((pokemon) => ({
  ...pokemon,
  seen: false,
}));

function Game({ setCurrentScore, currentScore }) {
  const [pokemonCardList, setPokemonCardList] = useState(
    getRandomPokemon(initialPokemons),
  );
  const [clickedPokemon, setClickedPokemon] = useState([]);

  const onClick = (clickedId) => {
    if (clickedPokemon.includes(clickedId)) {
      // Add lose condition here.
      return;
    }
    setClickedPokemon([...clickedPokemon, clickedId]);
    setCurrentScore((score) => score + 1);
    if (clickedPokemon.length === pokemonCardList.length) {
      // Add win condition here.
      return;
    }

    setPokemonCardList(shuffleArray(pokemonCardList));
  };

  const pokemonCards = pokemonCardList.map(({ sprite, name, id }) => (
    <GameCard {...{ sprite, name }} onClick={() => onClick(id)} key={id} />
  ));

  return (
    <div className="game">
      <h2 className="game__card-count">{currentScore}/15</h2>
      <div className="game__cards-container">{pokemonCards}</div>
    </div>
  );
}

export default Game;
