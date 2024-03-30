import React from 'react';
import GameItem from './GameItem';
import './GameList.css'; // Import the CSS file for styling

const GameList = ({ games, onAddToList, onRemoveFromList, list }) => (
  <div className="game-list">
    {games.map((game) => (
      <GameItem
        key={game.id}
        game={game}
        onAddToList={onAddToList}
        onRemoveFromList={onRemoveFromList}
        isInList={list.some(item => item.id === game.id)}
      />
    ))}
  </div>
);

export default GameList;
