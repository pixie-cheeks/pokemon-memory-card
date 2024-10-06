import { useState } from 'react';
import pokemons from './game-data.json';

function GameCard({ sprite, name }) {
  return (
    <div className="game__card card">
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

function Game() {
  const randomPokemon = getRandomPokemon(initialPokemons);
  // const [seenPokemon, setSeenPokemon] = useState(randomPokemon);

  const pokemonCards = randomPokemon.map(({ sprite, name, id }) => (
    <GameCard {...{ sprite, name }} key={id} />
  ));

  return (
    <div className="game">
      <h2 className="game__card-count">0/15</h2>
      <div className="game__cards-container">{pokemonCards}</div>
    </div>
  );
}

export default Game;
