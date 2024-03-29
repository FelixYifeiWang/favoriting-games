import React from 'react';
import GameItem from './GameItem';
import './GameList.css'; // Import the CSS file for styling

const GameList = ({ games, onAddToList }) => (
  <div className="game-list">
    {games.map((game) => (
      <GameItem key={game.id} game={game} onAddToList={onAddToList} />
    ))}
  </div>
);

export default GameList;
