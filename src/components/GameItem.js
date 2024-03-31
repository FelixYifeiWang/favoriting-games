import React from 'react';
import './GameItem.css';

const GameItem = ({ game, onAddToList, onRemoveFromList, isInList }) => (
  <div className="game-item">
    <img src={game.imageUrl} alt={game.name} className="game-image" />
    <h3>{game.name}</h3>
    <div className="game-info">
      <p><b>Price:</b> {game.price}</p>
      <p>{game.genre.join(' | ')}</p>
      <p><b>Release Date:</b> {game.releaseDate}</p>
      <p><b>IGN Rating:</b> {game.ignRating}</p>
    </div>
    <button className="button card-btn" onClick={() => isInList ? onRemoveFromList(game) : onAddToList(game)}>
      {isInList ? 'Remove from List' : 'Add to List'}
    </button>
  </div>
);

export default GameItem;
