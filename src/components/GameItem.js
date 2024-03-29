// src/components/GameItem.js
import React from 'react';
import './GameItem.css'; // Ensure this is correctly importing your CSS file

const GameItem = ({ game, onAddToList }) => (
  <div className="game-item">
    <img src={game.imageUrl} alt={game.name} className="game-image" />
    <h3>{game.name}</h3>
    <div className="game-info">
      <p>Price: {game.price}</p>
      <p>Genre: {game.genre.join(', ')}</p>
      <p>Release Date: {game.releaseDate}</p>
      <p>IGN Rating: {game.ignRating}</p>
    </div>
    <button onClick={() => onAddToList(game)}>Add to List</button>
  </div>
);

export default GameItem;
